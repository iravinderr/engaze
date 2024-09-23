import crypto from "crypto";

const input = "input";

const output = crypto.createHash("sha256").update(input).digest("hex");

console.log(output);
