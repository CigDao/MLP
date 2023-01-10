import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CanisterCleanupStatusMap {
  'stop' : Tree,
  'delete' : Tree,
  'transfer' : Tree,
}
export type Color = { 'B' : null } |
  { 'R' : null };
export type HeaderField = [string, string];
export interface IndexCanister {
  'autoScaleCollectionServiceCanister' : ActorMethod<[string], string>,
  'createCollectionServiceCanisterByGroup' : ActorMethod<
    [string],
    [] | [string],
  >,
  'deleteCanistersByPK' : ActorMethod<
    [string],
    [] | [CanisterCleanupStatusMap],
  >,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
  'getCycles' : ActorMethod<[], bigint>,
  'getHeapSize' : ActorMethod<[], bigint>,
  'getMemorySize' : ActorMethod<[], bigint>,
  'http_request' : ActorMethod<[Request], Response>,
  'upgradeGroupCanistersInPKRange' : ActorMethod<
    [string, string, Uint8Array],
    UpgradePKRangeResult,
  >,
}
export type InterCanisterActionResult = { 'ok' : null } |
  { 'err' : string };
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
  StreamingCallbackResponse,
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
export type Tree = { 'leaf' : null } |
  { 'node' : [Color, Tree, [string, [] | [InterCanisterActionResult]], Tree] };
export interface UpgradePKRangeResult {
  'nextKey' : [] | [string],
  'upgradeCanisterResults' : Array<[string, InterCanisterActionResult]>,
}
export interface _SERVICE extends IndexCanister {}
