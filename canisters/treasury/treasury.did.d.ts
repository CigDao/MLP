import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ErrorMessage = { 'message' : string };
export type HeaderField = [string, string];
export interface MemberDraft {
  'principal' : string,
  'description' : string,
  'power' : bigint,
}
export interface MemberResponse {
  'id' : number,
  'principal' : string,
  'executedAt' : [] | [Time],
  'createdAt' : Time,
  'description' : string,
  'error' : [] | [string],
  'executed' : boolean,
  'power' : bigint,
  'proposalId' : number,
}
export interface Request {
  'url' : string,
  'method' : string,
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
}
export type RequestDraft = { 'threshold' : ThresholdDraft } |
  { 'addLiquidity' : TransferDraft } |
  { 'swapFor' : TransferDraft } |
  { 'removeMember' : MemberDraft } |
  { 'addMember' : MemberDraft } |
  { 'withdrawLiquidity' : WithdrawLiquidityDraft } |
  { 'transfer' : TransferDraft };
export type RequestResponse = { 'threshold' : ThresholdResponse } |
  { 'addLiquidity' : TransferResponse } |
  { 'swapFor' : TransferResponse } |
  { 'removeMember' : MemberResponse } |
  { 'addMember' : MemberResponse } |
  { 'withdrawLiquidity' : WithdrawLiquidityResponse } |
  { 'transfer' : TransferResponse };
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
export interface ThresholdResponse {
  'id' : number,
  'executedAt' : [] | [Time],
  'createdAt' : Time,
  'description' : string,
  'error' : [] | [string],
  'executed' : boolean,
  'power' : bigint,
  'proposalId' : number,
}
export type Time = bigint;
export type Token = { 'icp' : null } |
  { 'token' : null };
export interface TransferDraft {
  'token' : Token,
  'recipient' : string,
  'description' : string,
  'amount' : bigint,
}
export interface TransferResponse {
  'id' : number,
  'token' : Token,
  'executedAt' : [] | [Time],
  'createdAt' : Time,
  'recipient' : string,
  'description' : string,
  'error' : [] | [string],
  'executed' : boolean,
  'amount' : bigint,
  'proposalId' : number,
}
export interface Treasury {
  'approveRequest' : ActorMethod<[number], Result>,
  'createRequest' : ActorMethod<[number, RequestDraft], number>,
  'fetchMembers' : ActorMethod<[], Array<[Principal, bigint]>>,
  'fetchRequests' : ActorMethod<[], Array<RequestResponse>>,
  'getCycles' : ActorMethod<[], bigint>,
  'getHeapSize' : ActorMethod<[], bigint>,
  'getMemorySize' : ActorMethod<[], bigint>,
  'getThreshold' : ActorMethod<[], bigint>,
  'http_request' : ActorMethod<[Request], Response>,
}
export interface WithdrawLiquidityDraft {
  'recipient' : string,
  'description' : string,
  'amount' : bigint,
}
export interface WithdrawLiquidityResponse {
  'id' : number,
  'executedAt' : [] | [Time],
  'createdAt' : Time,
  'description' : string,
  'error' : [] | [string],
  'executed' : boolean,
  'amount' : bigint,
  'proposalId' : number,
}
export interface _SERVICE extends Treasury {}
