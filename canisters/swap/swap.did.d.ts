import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type HeaderField = [string, string];
export interface Request {
  'url' : string,
  'method' : string,
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
}
export interface Response {
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type StreamingCallback = ActorMethod<
  [StreamingCallbackToken],
  StreamingCallbackResponse
>;
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Uint8Array,
}
export interface StreamingCallbackToken {
  'key' : number,
  'sha256' : [] | [Uint8Array],
  'index' : number,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }
  };
export interface Swap {
  'getCycles' : ActorMethod<[], bigint>,
  'getEquivalentToken1Estimate' : ActorMethod<[bigint], bigint>,
  'getEquivalentToken2Estimate' : ActorMethod<[bigint], bigint>,
  'getHeapSize' : ActorMethod<[], bigint>,
  'getMemorySize' : ActorMethod<[], bigint>,
  'getShares' : ActorMethod<[Principal], bigint>,
  'getSwapToken1Estimate' : ActorMethod<[bigint], bigint>,
  'getSwapToken1EstimateGivenToken2' : ActorMethod<[bigint], TxReceipt>,
  'getSwapToken2Estimate' : ActorMethod<[bigint], bigint>,
  'getSwapToken2EstimateGivenToken1' : ActorMethod<[bigint], TxReceipt>,
  'getWithdrawEstimate' : ActorMethod<
    [bigint],
    { 'share1' : bigint, 'share2' : bigint }
  >,
  'http_request' : ActorMethod<[Request], Response>,
  'price' : ActorMethod<[], bigint>,
  'provide' : ActorMethod<[bigint, bigint], TxReceipt>,
  'swapToken1' : ActorMethod<[bigint, bigint], TxReceipt>,
  'swapToken2' : ActorMethod<[bigint, bigint], TxReceipt>,
  'withdraw' : ActorMethod<[bigint], TxReceipt>,
}
export type TxReceipt = { 'Ok' : bigint } |
  {
    'Err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'ErrorOperationStyle' : null } |
      { 'Unauthorized' : null } |
      { 'LedgerTrap' : null } |
      { 'ErrorTo' : null } |
      { 'Other' : string } |
      { 'Slippage' : bigint } |
      { 'InsufficientPoolBalance' : null } |
      { 'BlockUsed' : null } |
      { 'AmountTooSmall' : null }
  };
export interface _SERVICE extends Swap {}
