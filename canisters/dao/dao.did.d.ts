import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Canister = { 'dao' : null } |
  { 'swap' : null } |
  { 'taxCollector' : null } |
  { 'treasury' : null };
export interface Dao {
  'createProposal' : ActorMethod<[ProposalRequest], TxReceipt>,
  'fetchAcceptedProposals' : ActorMethod<[], Array<Proposal>>,
  'fetchRejectedProposals' : ActorMethod<[], Array<Proposal>>,
  'getCycles' : ActorMethod<[], bigint>,
  'getHeapSize' : ActorMethod<[], bigint>,
  'getMemorySize' : ActorMethod<[], bigint>,
  'getProposal' : ActorMethod<[], [] | [Proposal]>,
  'getProposalCost' : ActorMethod<[], bigint>,
  'getStake' : ActorMethod<[Principal], Stake>,
  'getStakedAmount' : ActorMethod<[Principal], bigint>,
  'http_request' : ActorMethod<[Request], Response>,
  'stakeTokens' : ActorMethod<[bigint], TxReceipt>,
  'startUnStaking' : ActorMethod<[], TxReceipt>,
  'totalStaked' : ActorMethod<[], bigint>,
  'unStakeTokens' : ActorMethod<[bigint], TxReceipt>,
  'vote' : ActorMethod<[number, boolean], TxReceipt>,
}
export type HeaderField = [string, string];
export interface MemberDraft {
  'principal' : string,
  'description' : string,
  'power' : bigint,
}
export type Proposal = { 'treasuryAction' : TreasuryAction } |
  { 'upgrade' : Upgrade } |
  { 'proposalCost' : ProposalCost } |
  { 'treasury' : Treasury };
export interface ProposalCost {
  'id' : number,
  'nay' : bigint,
  'yay' : bigint,
  'title' : string,
  'creator' : string,
  'timeStamp' : Time,
  'executedAt' : [] | [Time],
  'description' : string,
  'executed' : boolean,
  'amount' : bigint,
}
export interface ProposalCostRequest {
  'title' : string,
  'description' : string,
  'amount' : bigint,
}
export type ProposalRequest = { 'treasuryAction' : TreasuryActionRequest } |
  { 'upgrade' : UpgradeRequest } |
  { 'proposalCost' : ProposalCostRequest } |
  { 'treasury' : TreasuryRequest };
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
export interface Response {
  'body' : Uint8Array,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface Stake { 'timeStamp' : [] | [Time], 'amount' : bigint }
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
export type Time = bigint;
export type Token = { 'icp' : null } |
  { 'token' : null };
export interface TransferDraft {
  'token' : Token,
  'recipient' : string,
  'description' : string,
  'amount' : bigint,
}
export interface Treasury {
  'id' : number,
  'nay' : bigint,
  'yay' : bigint,
  'title' : string,
  'creator' : string,
  'timeStamp' : Time,
  'executedAt' : [] | [Time],
  'vote' : boolean,
  'description' : string,
  'executed' : boolean,
  'treasuryRequestId' : number,
}
export interface TreasuryAction {
  'id' : number,
  'nay' : bigint,
  'yay' : bigint,
  'title' : string,
  'creator' : string,
  'timeStamp' : Time,
  'executedAt' : [] | [Time],
  'request' : RequestDraft,
  'description' : string,
  'executed' : boolean,
}
export interface TreasuryActionRequest {
  'title' : string,
  'request' : RequestDraft,
  'description' : string,
}
export interface TreasuryRequest {
  'title' : string,
  'vote' : boolean,
  'description' : string,
  'treasuryRequestId' : number,
}
export type TxReceipt = { 'Ok' : bigint } |
  {
    'Err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'ActiveProposal' : null } |
      { 'ErrorOperationStyle' : null } |
      { 'Unauthorized' : null } |
      { 'LedgerTrap' : null } |
      { 'ErrorTo' : null } |
      { 'Other' : string } |
      { 'BlockUsed' : null } |
      { 'AmountTooSmall' : null }
  };
export interface Upgrade {
  'id' : number,
  'nay' : bigint,
  'yay' : bigint,
  'title' : string,
  'creator' : string,
  'source' : string,
  'timeStamp' : Time,
  'executedAt' : [] | [Time],
  'args' : Uint8Array,
  'hash' : string,
  'wasm' : Uint8Array,
  'description' : string,
  'canister' : Canister,
  'executed' : boolean,
}
export interface UpgradeRequest {
  'title' : string,
  'source' : string,
  'args' : Uint8Array,
  'hash' : string,
  'wasm' : Uint8Array,
  'description' : string,
  'canister' : Canister,
}
export interface WithdrawLiquidityDraft {
  'recipient' : string,
  'description' : string,
  'amount' : bigint,
}
export interface _SERVICE extends Dao {}
