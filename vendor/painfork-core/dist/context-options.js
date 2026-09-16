import optionsJson from "./data/context-options.json" with { type: "json" };
const OPTIONS = optionsJson;
export function getContextOptions() {
    return OPTIONS;
}
export function listVerticalOptions() {
    return OPTIONS.verticals;
}
export function getVerticalLabel(id) {
    return OPTIONS.verticals.find((v) => v.id === id)?.label ?? id;
}
export function parseCommaList(value) {
    return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}
export function toggleCommaItem(current, item) {
    const list = parseCommaList(current);
    const lower = item.toLowerCase();
    const idx = list.findIndex((x) => x.toLowerCase() === lower);
    if (idx >= 0) {
        list.splice(idx, 1);
    }
    else {
        list.push(item);
    }
    return list.join(", ");
}
export function appendNote(current, prompt) {
    const trimmed = current.trim();
    if (!trimmed)
        return prompt;
    if (trimmed.includes(prompt))
        return trimmed;
    return `${trimmed}\n${prompt}`;
}
//# sourceMappingURL=context-options.js.map