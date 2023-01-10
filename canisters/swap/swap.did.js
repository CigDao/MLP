export const idlFactory = ({ IDL }) => {
  const TxReceipt = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : IDL.Variant({
      'InsufficientAllowance' : IDL.Null,
      'InsufficientBalance' : IDL.Null,
      'ErrorOperationStyle' : IDL.Null,
      'Unauthorized' : IDL.Null,
      'LedgerTrap' : IDL.Null,
      'ErrorTo' : IDL.Null,
      'Other' : IDL.Text,
      'Slippage' : IDL.Nat,
      'InsufficientPoolBalance' : IDL.Null,
      'BlockUsed' : IDL.Null,
      'AmountTooSmall' : IDL.Null,
    }),
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
  const Swap = IDL.Service({
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'getEquivalentToken1Estimate' : IDL.Func([IDL.Nat], [IDL.Nat], []),
    'getEquivalentToken2Estimate' : IDL.Func([IDL.Nat], [IDL.Nat], []),
    'getHeapSize' : IDL.Func([], [IDL.Nat], ['query']),
    'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
    'getShares' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getSwapToken1Estimate' : IDL.Func([IDL.Nat], [IDL.Nat], []),
    'getSwapToken1EstimateGivenToken2' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'getSwapToken2Estimate' : IDL.Func([IDL.Nat], [IDL.Nat], []),
    'getSwapToken2EstimateGivenToken1' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'getWithdrawEstimate' : IDL.Func(
        [IDL.Nat],
        [IDL.Record({ 'share1' : IDL.Nat, 'share2' : IDL.Nat })],
        [],
      ),
    'http_request' : IDL.Func([Request], [Response], ['query']),
    'price' : IDL.Func([], [IDL.Nat], []),
    'provide' : IDL.Func([IDL.Nat, IDL.Nat], [TxReceipt], []),
    'swapToken1' : IDL.Func([IDL.Nat, IDL.Nat], [TxReceipt], []),
    'swapToken2' : IDL.Func([IDL.Nat, IDL.Nat], [TxReceipt], []),
    'withdraw' : IDL.Func([IDL.Nat], [TxReceipt], []),
  });
  return Swap;
};
export const init = ({ IDL }) => { return [IDL.Text, IDL.Text, IDL.Text]; };
