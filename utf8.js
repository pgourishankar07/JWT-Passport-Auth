const text = "abc";
const encoder = new TextEncoder();
const utf8Array = encoder.encode(text);
console.log(utf8Array); // Uint8Array representing UTF-8 encoded text

const decoder = new TextDecoder();
const decodedText = decoder.decode(utf8Array);
console.log(decodedText); // "Hello, world!"
