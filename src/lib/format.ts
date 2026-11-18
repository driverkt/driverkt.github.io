const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const formatDate = (d: Date) => day.format(d);
export const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Prefix a site path with the configured base. */
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

