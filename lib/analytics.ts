type Gtag = (...args: unknown[]) => void;

export type AnalyticsTarget = {
  dataLayer?: Array<ArrayLike<unknown>>;
  gtag?: Gtag;
};

type LeadGenerationEvent = {
  formName: string;
  formType: "quote_request" | "recycle_request";
  submissionId: string;
};

function getBrowserAnalyticsTarget(): AnalyticsTarget | undefined {
  if (typeof window === "undefined") return undefined;
  return window as typeof window & AnalyticsTarget;
}

export function trackLeadGeneration(
  event: LeadGenerationEvent,
  target: AnalyticsTarget | undefined = getBrowserAnalyticsTarget(),
) {
  if (!target) return;

  target.dataLayer ??= [];
  target.gtag ??= function gtag(...args: unknown[]) {
    target.dataLayer?.push(args);
  };

  target.gtag("event", "generate_lead", {
    form_name: event.formName,
    form_type: event.formType,
    submission_id: event.submissionId,
  });
}
