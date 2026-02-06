export type AiConfig = {
    enableForecasting: boolean;
    enableMarketingAutomation: boolean;
    enableUpselling: boolean;
    id: string;
    isAiEnabled: boolean;
    orgId: string;
};

export type AiFeatureFlagKeys =
    | "enableUpselling"
    | "enableForecasting"
    | "enableMarketingAutomation"
    | "isAiEnabled";

export type AiFeatureFlag = {
    enableUpselling: boolean;
    enableForecasting: boolean;
    enableMarketingAutomation: boolean;
    isAiEnabled: boolean;
};
