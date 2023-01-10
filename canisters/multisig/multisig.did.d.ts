import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ErrorMessage = { 'message' : string };
export type HeaderField = [string, string];
export interface MemberDraft {
  'principal' : string,
  'description' : string,
  'power' : bigint,
}
export interface MultiSig {
  'approveRequest' : ActorMethod<[number], Result>,
  'createRequest' : ActorMethod<[RequestDraft], number>,
  'getCycles' : ActorMethod<[], bigint>,
  'getHeapSize' : ActorMethod<[], bigint>,
  'getMemorySize' : ActorMethod<[], bigint>,
  'http_request' : ActorMethod<[Request], Response>,
}
export interface Request {
  'url' : string,
  'method' : string,
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
}
export type RequestDraft = { 'threshold' : ThresholdDraft } |
  { 'removeMember' : MemberDraft } |
  { 'addMember' : MemberDraft } |
  { 'transfer' : TransferDraft };
export interface Response {
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Result = { 'ok' : null } |
  { 'err' : ErrorMessage };
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
export interface ThresholdDraft { 'description' : string, 'power' : bigint }
export interface TransferDraft {
  'recipient' : string,
  'description' : string,
  'amount' : bigint,
}
export interface _SERVICE extends MultiSig {}
