import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface TopUp { 'topUp' : ActorMethod<[], undefined> }
export interface _SERVICE extends TopUp {}
