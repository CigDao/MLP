export const idlFactory = ({ IDL }) => {
  const ErrorMessage = IDL.Variant({ 'message' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : ErrorMessage });
  const ThresholdDraft = IDL.Record({
    'description' : IDL.Text,
    'power' : IDL.Nat,
  });
  const MemberDraft = IDL.Record({
    'principal' : IDL.Text,
    'description' : IDL.Text,
    'power' : IDL.Nat,
  });
  const TransferDraft = IDL.Record({
    'recipient' : IDL.Text,
    'description' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const RequestDraft = IDL.Variant({
    'threshold' : ThresholdDraft,
    'removeMember' : MemberDraft,
    'addMember' : MemberDraft,
    'transfer' : TransferDraft,
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
  const MultiSig = IDL.Service({
    'approveRequest' : IDL.Func([IDL.Nat32], [Result], []),
    'createRequest' : IDL.Func([RequestDraft], [IDL.Nat32], []),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'getHeapSize' : IDL.Func([], [IDL.Nat], ['query']),
    'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
    'http_request' : IDL.Func([Request], [Response], ['query']),
  });
  return MultiSig;
};
export const init = ({ IDL }) => { return [IDL.Principal, IDL.Text]; };
