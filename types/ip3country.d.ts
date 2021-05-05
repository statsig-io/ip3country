export = ip3country;

declare namespace ip3country {
  /**
   * Initializes ip3country asynchronously.
   * Must be called once before any lookups.
   */
  function init(): Promise<void>;

  /**
   * Initializes ip3country synchronously.
   * Must be called once before any lookups.
   *
   * `init` is preferred. This synchronous version is provided as an utility in
   * cases where you can't run asynchronous code. It is not simply a synchronous
   * wrapper--it replaces all async calls with sync calls.
   */
  function initSync(): void;

  /**
   * Returns a 2-digit country code for the given IP Address.  Returns `null` if
   * there is no match.  Behaviour is unspecified for invalid IP Address strings
   * (either null or a random country will be returned).
   *
   * @param ip An IP Address in octet dot-decimal notation, e.g. "127.0.0.1".
   */
  function lookupStr(ip: string): string;

  /**
   * Returns a 2-digit country code for the given IP Address.  Returns `null` if
   * there is no match.
   *
   * @param ip An IP Address represented as a 32-bit signed integer.
   */
  function lookupNumeric(ip: number): string;
}
