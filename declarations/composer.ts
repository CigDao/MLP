import type { Principal } from '@dfinity/principal';
export interface MLPRequest {
  'fee' : bigint,
  'decimals' : number,
  'daoName' : string,
  'vestingThreshold' : bigint,
  'stakedTime' : bigint,
  'maxClaims' : bigint,
  'clif' : bigint,
  'logo' : string,
  'name' : string,
  'swapFundersfee' : number,
  'swapFee' : number,
  'totalSupply' : bigint,
  'proposalCost' : bigint,
  'token2' : string,
  'fundingGoal' : bigint,
  'symbol' : string,
};
export type Result = { 'Ok' : string } |
  {
    'Err' : { 'NotFound' : null } |
      { 'Unauthorized' : null } |
      { 'Other' : string }
  };
export interface _SERVICE {
  'create' : (arg_0: MLPRequest) => Promise<Result>,
  'createDao' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: MLPRequest,
    ) => Promise<Result>,
  'createTest' : () => Promise<Result>,
  'createToken' : (arg_0: string, arg_1: string, arg_2: MLPRequest) => Promise<
      Result
    >,
  'testRegistry' : () => Promise<Result>,
};

export const _factory = ({ IDL }) => {
    const MLPRequest = IDL.Record({
      'fee' : IDL.Nat,
      'decimals' : IDL.Nat8,
      'daoName' : IDL.Text,
      'vestingThreshold' : IDL.Nat,
      'stakedTime' : IDL.Nat,
      'maxClaims' : IDL.Nat,
      'clif' : IDL.Nat,
      'logo' : IDL.Text,
      'name' : IDL.Text,
      'swapFundersfee' : IDL.Float64,
      'swapFee' : IDL.Float64,
      'totalSupply' : IDL.Nat,
      'proposalCost' : IDL.Nat,
      'token2' : IDL.Text,
      'fundingGoal' : IDL.Nat,
      'symbol' : IDL.Text,
    });
    const Result = IDL.Variant({
      'Ok' : IDL.Text,
      'Err' : IDL.Variant({
        'NotFound' : IDL.Null,
        'Unauthorized' : IDL.Null,
        'Other' : IDL.Text,
      }),
    });
    return IDL.Service({
      'create' : IDL.Func([MLPRequest], [Result], []),
      'createDao' : IDL.Func(
          [IDL.Text, IDL.Text, IDL.Text, MLPRequest],
          [Result],
          [],
        ),
      'createTest' : IDL.Func([], [Result], []),
      'createToken' : IDL.Func([IDL.Text, IDL.Text, MLPRequest], [Result], []),
      'testRegistry' : IDL.Func([], [Result], []),
    });
  };
