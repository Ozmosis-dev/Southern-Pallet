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

function sendEvent(name: string, parameters: Record<string, string>, target?: AnalyticsTarget) {
  if (!target) return;
  // Measurement must never prevent a form confirmation or telephone navigation.
  try {
    target.dataLayer ??= [];
    target.gtag ??= function gtag(...args: unknown[]) {
      target.dataLayer?.push(args);
    };
    target.gtag("event", name, parameters);
  } catch {
    // Analytics can be unavailable or blocked independently of the website.
  }
}

export function trackLeadGeneration(
  event: LeadGenerationEvent,
  target: AnalyticsTarget | undefined = getBrowserAnalyticsTarget(),
) {
  const parameters = {
    form_name: event.formName,
    form_type: event.formType,
    submission_id: event.submissionId,
  };
  sendEvent("form_submission", parameters, target);
  sendEvent("generate_lead", parameters, target);
}

export function trackCareerApplication(
  event: { submissionId: string },
  target: AnalyticsTarget | undefined = getBrowserAnalyticsTarget(),
) {
  const parameters = { form_name: "Careers Application", form_type: "career_application", submission_id: event.submissionId };
  sendEvent("form_submission", parameters, target);
  sendEvent("job_application_submit", parameters, target);
}

export function trackPhoneClick(
  event: { pagePath: string; placement: string },
  target: AnalyticsTarget | undefined = getBrowserAnalyticsTarget(),
) {
  sendEvent("phone_click", { page_path: event.pagePath, link_placement: event.placement, contact_method: "phone" }, target);
}
