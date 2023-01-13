export const idlFactory = ({ IDL }) => {
  const ErrorMessage = IDL.Variant({ 'message' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : ErrorMessage });
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
  const Time = IDL.Int;
  const ThresholdResponse = IDL.Record({
    'id' : IDL.Nat32,
    'executedAt' : IDL.Opt(Time),
    'createdAt' : Time,
    'description' : IDL.Text,
    'error' : IDL.Opt(IDL.Text),
    'executed' : IDL.Bool,
    'power' : IDL.Nat,
    'proposalId' : IDL.Nat32,
  });
  const TransferResponse = IDL.Record({
    'id' : IDL.Nat32,
    'token' : Token,
    'executedAt' : IDL.Opt(Time),
    'createdAt' : Time,
    'recipient' : IDL.Text,
    'description' : IDL.Text,
    'error' : IDL.Opt(IDL.Text),
    'executed' : IDL.Bool,
    'amount' : IDL.Nat,
    'proposalId' : IDL.Nat32,
  });
  const MemberResponse = IDL.Record({
    'id' : IDL.Nat32,
    'principal' : IDL.Text,
    'executedAt' : IDL.Opt(Time),
    'createdAt' : Time,
    'description' : IDL.Text,
    'error' : IDL.Opt(IDL.Text),
    'executed' : IDL.Bool,
    'power' : IDL.Nat,
    'proposalId' : IDL.Nat32,
  });
  const WithdrawLiquidityResponse = IDL.Record({
    'id' : IDL.Nat32,
    'executedAt' : IDL.Opt(Time),
    'createdAt' : Time,
    'description' : IDL.Text,
    'error' : IDL.Opt(IDL.Text),
    'executed' : IDL.Bool,
    'amount' : IDL.Nat,
    'proposalId' : IDL.Nat32,
  });
  const RequestResponse = IDL.Variant({
    'threshold' : ThresholdResponse,
    'addLiquidity' : TransferResponse,
    'swapFor' : TransferResponse,
    'removeMember' : MemberResponse,
    'addMember' : MemberResponse,
    'withdrawLiquidity' : WithdrawLiquidityResponse,
    'transfer' : TransferResponse,
  });
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
  const Treasury = IDL.Service({
    'approveRequest' : IDL.Func([IDL.Nat32], [Result], []),
    'createRequest' : IDL.Func([IDL.Nat32, RequestDraft], [IDL.Nat32], []),
    'fetchMembers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
        ['query'],
      ),
    'fetchRequests' : IDL.Func([], [IDL.Vec(RequestResponse)], ['query']),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'getHeapSize' : IDL.Func([], [IDL.Nat], ['query']),
    'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
    'getThreshold' : IDL.Func([], [IDL.Nat], ['query']),
    'http_request' : IDL.Func([Request], [Response], ['query']),
  });
  return Treasury;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Text, IDL.Text, IDL.Text];
};
