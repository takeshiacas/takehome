import * as LDClient from 'launchdarkly-js-client-sdk';

class LaunchDarkly {
  // Singleton pattern class for LaunchDarkly client
  private static instance: LaunchDarkly;
  private ldClient: LDClient.LDClient | null = null;
  private flags?: LDClient.LDFlagSet | null = null;

  private constructor() {}

  public static getInstance(): LaunchDarkly {
    if (!LaunchDarkly.instance) {
      LaunchDarkly.instance = new LaunchDarkly();
    }

    return LaunchDarkly.instance;
  }

  public initializeClient(clientSideId: string, context: LDClient.LDContext): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ldClient = LDClient.initialize(clientSideId, context);

      this.ldClient.on('ready', () => {
        this.flags = this.ldClient?.allFlags();
        resolve();
      });

      this.ldClient.on('error', (error) => {
        console.error(`Error initializing LaunchDarkly client: ${error}`);
        reject(error);
      });
    });
  }

  public getFlag(flagKey: string): any {
    if (!this.flags) {
      return undefined;
    }

    return this.flags[flagKey];
  }
}

export default LaunchDarkly;
