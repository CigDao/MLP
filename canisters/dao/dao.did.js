export const idlFactory = ({ IDL }) => {
  const ThresholdDraft = IDL.Record({
    'description' : IDL.Text,
    'power' : IDL.Nat,
  });
  const Token = IDL.Variant({ 'icp' : IDL.Null, 'token' : IDL.Null });
  const TransferDraft = IDL.Record({
    'token' : Token,
    'recipient' : IDL.Text,
    'description' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const MemberDraft = IDL.Record({
    'principal' : IDL.Text,
    'description' : IDL.Text,
    'power' : IDL.Nat,
  });
  const WithdrawLiquidityDraft = IDL.Record({
    'recipient' : IDL.Text,
    'description' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const RequestDraft = IDL.Variant({
    'threshold' : ThresholdDraft,
    'addLiquidity' : TransferDraft,
    'swapFor' : TransferDraft,
    'removeMember' : MemberDraft,
    'addMember' : MemberDraft,
    'withdrawLiquidity' : WithdrawLiquidityDraft,
    'transfer' : TransferDraft,
  });
  const TreasuryActionRequest = IDL.Record({
    'title' : IDL.Text,
    'request' : RequestDraft,
    'description' : IDL.Text,
  });
  const Canister = IDL.Variant({
    'dao' : IDL.Null,
    'swap' : IDL.Null,
    'taxCollector' : IDL.Null,
    'treasury' : IDL.Null,
  });
  const UpgradeRequest = IDL.Record({
    'title' : IDL.Text,
    'source' : IDL.Text,
    'args' : IDL.Vec(IDL.Nat8),
    'hash' : IDL.Text,
    'wasm' : IDL.Vec(IDL.Nat8),
    'description' : IDL.Text,
    'canister' : Canister,
  });
  const ProposalCostRequest = IDL.Record({
    'title' : IDL.Text,
    'description' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const TreasuryRequest = IDL.Record({
    'title' : IDL.Text,
    'vote' : IDL.Bool,
    'description' : IDL.Text,
    'treasuryRequestId' : IDL.Nat32,
  });
  const ProposalRequest = IDL.Variant({
    'treasuryAction' : TreasuryActionRequest,
    'upgrade' : UpgradeRequest,
    'proposalCost' : ProposalCostRequest,
    'treasury' : TreasuryRequest,
  });
  const TxReceipt = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : IDL.Variant({
      'InsufficientAllowance' : IDL.Null,
      'InsufficientBalance' : IDL.Null,
      'ActiveProposal' : IDL.Null,
      'ErrorOperationStyle' : IDL.Null,
      'Unauthorized' : IDL.Null,
      'LedgerTrap' : IDL.Null,
      'ErrorTo' : IDL.Null,
      'Other' : IDL.Text,
      'BlockUsed' : IDL.Null,
      'AmountTooSmall' : IDL.Null,
    }),
  });
  const Time = IDL.Int;
  const TreasuryAction = IDL.Record({
    'id' : IDL.Nat32,
    'nay' : IDL.Nat,
    'yay' : IDL.Nat,
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'timeStamp' : Time,
    'executedAt' : IDL.Opt(Time),
    'request' : RequestDraft,
    'description' : IDL.Text,
    'executed' : IDL.Bool,
  });
  const Upgrade = IDL.Record({
    'id' : IDL.Nat32,
    'nay' : IDL.Nat,
    'yay' : IDL.Nat,
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'source' : IDL.Text,
    'timeStamp' : Time,
    'executedAt' : IDL.Opt(Time),
    'args' : IDL.Vec(IDL.Nat8),
    'hash' : IDL.Text,
    'wasm' : IDL.Vec(IDL.Nat8),
    'description' : IDL.Text,
    'canister' : Canister,
    'executed' : IDL.Bool,
  });
  const ProposalCost = IDL.Record({
    'id' : IDL.Nat32,
    'nay' : IDL.Nat,
    'yay' : IDL.Nat,
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'timeStamp' : Time,
    'executedAt' : IDL.Opt(Time),
    'description' : IDL.Text,
    'executed' : IDL.Bool,
    'amount' : IDL.Nat,
  });
  const Treasury = IDL.Record({
    'id' : IDL.Nat32,
    'nay' : IDL.Nat,
    'yay' : IDL.Nat,
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'timeStamp' : Time,
    'executedAt' : IDL.Opt(Time),
    'vote' : IDL.Bool,
    'description' : IDL.Text,
    'executed' : IDL.Bool,
    'treasuryRequestId' : IDL.Nat32,
  });
  const Proposal = IDL.Variant({
    'treasuryAction' : TreasuryAction,
    'upgrade' : Upgrade,
    'proposalCost' : ProposalCost,
    'treasury' : Treasury,
  });
  const Stake = IDL.Record({ 'timeStamp' : IDL.Opt(Time), 'amount' : IDL.Nat });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const Request = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Nat32,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index' : IDL.Nat32,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackResponse],
      ['query'],
    );
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }),
  });
  const Response = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const Dao = IDL.Service({
    '_tally' : IDL.Func([], [], []),
    'createProposal' : IDL.Func([ProposalRequest], [TxReceipt], []),
    'fetchAcceptedProposals' : IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    'fetchRejectedProposals' : IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'getHeapSize' : IDL.Func([], [IDL.Nat], ['query']),
    'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
    'getProposal' : IDL.Func([], [IDL.Opt(Proposal)], ['query']),
    'getProposalCost' : IDL.Func([], [IDL.Nat], ['query']),
    'getStake' : IDL.Func([IDL.Principal], [Stake], ['query']),
    'http_request' : IDL.Func([Request], [Response], ['query']),
    'stakeTokens' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'startUnStaking' : IDL.Func([], [TxReceipt], []),
    'unStakeTokens' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'vote' : IDL.Func([IDL.Nat32, IDL.Bool], [TxReceipt], []),
  });
  return Dao;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Text, IDL.Text, IDL.Nat, IDL.Int];
};
