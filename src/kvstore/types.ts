import { Beef } from '../transaction/Beef.js'
import { PubKeyHex, WalletProtocol } from '../wallet/Wallet.interfaces.js'
import { WalletInterface } from '../wallet/index.js'

/**
 * Configuration interface for GlobalKVStore operations.
 * Defines all options for connecting to overlay services and managing KVStore behavior.
 */
export interface KVStoreConfig {
  /** The overlay service host URL */
  overlayHost?: string
  /** Protocol ID for the KVStore protocol */
  protocolID?: WalletProtocol
  /** Service name for overlay submission */
  serviceName?: string
  /** Amount of satoshis for each token */
  tokenAmount?: number
  /** Topics for overlay submission */
  topics?: string[]
  /** Originator */
  originator?: string
  /** Wallet interface for operations */
  wallet?: WalletInterface
  /** Network preset for overlay services */
  networkPreset?: 'mainnet' | 'testnet' | 'local'
  /** Whether to accept delayed broadcast */
  acceptDelayedBroadcast?: boolean
  /** Description for token set */
  tokenSetDescription?: string
  /** Description for token update */
  tokenUpdateDescription?: string
  /** Description for token removal */
  tokenRemovalDescription?: string
}

/**
 * Query parameters for KVStore lookups from overlay services.
 * Used when searching for existing key-value pairs in the network.
 */
export interface KVStoreQuery {
  key?: string
  controller?: PubKeyHex
  protocolID?: WalletProtocol
  limit?: number
  skip?: number
  sortOrder?: 'asc' | 'desc'
}

/**
 * Options for configuring KVStore get operations (local processing)
 */
export interface KVStoreGetOptions {
  /** Whether to build and include history for each entry */
  history?: boolean
  /** Whether to include token transaction data in results */
  includeToken?: boolean
  /** Service name for overlay retrieval */
  serviceName?: string
}

export interface KVStoreSetOptions {
  protocolID?: WalletProtocol
  tokenSetDescription?: string
  tokenUpdateDescription?: string
  tokenAmount?: number
}

export interface KVStoreRemoveOptions {
  protocolID?: WalletProtocol
  tokenRemovalDescription?: string
}

/**
 * KVStore entry returned from queries
 */
export interface KVStoreEntry {
  key: string
  value: string
  controller: PubKeyHex
  protocolID: WalletProtocol
  token?: KVStoreToken
  history?: string[]
}

/**
 * Result structure for KVStore lookups from overlay services.
 * Contains the transaction output information for a found key-value pair.
 */
export interface KVStoreLookupResult {
  txid: string
  outputIndex: number
  outputScript: string
  satoshis: number
  history?: (output: any, currentDepth: number) => Promise<boolean>
}

/**
 * Token structure containing a KVStore token from overlay services.
 * Wraps the transaction data and metadata for a key-value pair.
 */
export interface KVStoreToken {
  txid: string
  outputIndex: number
  satoshis: number
  beef: Beef
}

export const kvProtocol = {
  protocolID: 0,
  key: 1,
  value: 2,
  controller: 3,
  signature: 4
}
