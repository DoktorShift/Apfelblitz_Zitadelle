
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wallet, Zap, Clock, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import MatrixCounterEffect from './MatrixCounterEffect';

interface Transaction {
  amount: number;
  received_at: string;
  comment?: string;
  is_zap: boolean;
}

interface WalletBalance {
  wallet_name: string;
  balance: number;
}

interface LastPayment {
  amount: number;
  received_at: string;
}

interface CounterData {
  tx_count: number;
}

const NetworkStatsSection = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [lastPayment, setLastPayment] = useState<LastPayment | null>(null);
  const [txCount, setTxCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setError(null);
      
      // Fetch all data in parallel
      const [transactionsRes, balancesRes, lastPaymentRes, counterRes] = await Promise.all([
        fetch('https://testa.bitcoin-darmstadt.de/api/payment_webhook_list'),
        fetch('https://testa.bitcoin-darmstadt.de/api/balance_webhook'),
        fetch('https://testa.bitcoin-darmstadt.de/api/payment_webhook'),
        fetch('https://testa.bitcoin-darmstadt.de/api/counter_webhook')
      ]);

      if (!transactionsRes.ok || !balancesRes.ok || !lastPaymentRes.ok || !counterRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [transactionsData, balancesData, lastPaymentData, counterData] = await Promise.all([
        transactionsRes.json(),
        balancesRes.json(),
        lastPaymentRes.json(),
        counterRes.json()
      ]);

      setTransactions(transactionsData.transactions || []);
      setBalances(balancesData || []);
      setLastPayment(lastPaymentData);
      setTxCount(counterData.tx_count || 0);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching network data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const totalBalance = balances.reduce((sum, wallet) => sum + wallet.balance, 0);

  if (loading) {
    return (
      <motion.section 
        className="px-4 md:px-6 py-20 bg-gradient-to-b from-black via-green-950/5 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="matrix-terminal p-8">
            <div className="matrix-loader mx-auto mb-4"></div>
            <p className="text-green-400 font-mono">SYNCING_NETWORK_DATA...</p>
          </div>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section 
        className="px-4 md:px-6 py-20 bg-gradient-to-b from-black via-green-950/5 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="matrix-terminal border-red-500/50 p-8">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 font-mono font-bold mb-4">CONNECTION_ERROR</p>
            <p className="text-red-300 font-mono text-sm mb-6">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-red-900/30 border border-red-500/50 text-red-400 px-6 py-3 rounded font-mono hover:bg-red-900/50 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="h-4 w-4" />
              RETRY_CONNECTION
            </button>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="px-4 md:px-6 py-20 bg-gradient-to-b from-black via-green-950/5 to-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 font-mono">
            LIVE_NETWORK_STATUS
          </h2>
          <div className="flex items-center justify-center gap-4 text-green-400/70 font-mono">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm">LIVE</span>
            </div>
            <span className="text-xs">LAST_SYNC: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Transaction Counter */}
          <motion.div
            className="matrix-terminal p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-bold text-green-400 font-mono">TX_COUNT</h3>
            </div>
            <div className="text-center">
              <MatrixCounterEffect 
                value={txCount} 
                className="text-4xl font-bold text-green-400"
                animationDuration={300}
                triggerDelay={0}
                repeatInterval={0}
              />
              <p className="text-green-300/70 text-sm font-mono mt-2">TOTAL_PROCESSED</p>
            </div>
          </motion.div>

          {/* Last Payment */}
          <motion.div
            className="matrix-terminal p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-green-400 font-mono">LAST_PAYMENT</h3>
            </div>
            {lastPayment ? (
              <div className="text-center">
                <MatrixCounterEffect 
                  value={lastPayment.amount} 
                  suffix=" sats"
                  className="text-3xl font-bold text-yellow-400"
                  animationDuration={300}
                  triggerDelay={0}
                  repeatInterval={0}
                />
                <p className="text-green-300/70 text-sm font-mono mt-2">
                  {formatTimeAgo(lastPayment.received_at)}
                </p>
              </div>
            ) : (
              <div className="text-center text-green-400/50 font-mono">
                NO_PAYMENTS_YET
              </div>
            )}
          </motion.div>

          {/* Total Balance */}
          <motion.div
            className="matrix-terminal p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-bold text-green-400 font-mono">TOTAL_BALANCE</h3>
            </div>
            <div className="text-center">
              <MatrixCounterEffect 
                value={totalBalance} 
                suffix=" sats"
                className="text-3xl font-bold text-blue-400"
                animationDuration={300}
                triggerDelay={0}
                repeatInterval={0}
              />
              <p className="text-green-300/70 text-sm font-mono mt-2">
                {balances.length} WALLET{balances.length !== 1 ? 'S' : ''}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wallet Balances */}
        {balances.length > 0 && (
          <motion.div
            className="matrix-terminal p-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-green-400 font-mono mb-6 text-center">
              WALLET_BALANCES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {balances.map((wallet, index) => (
                <div key={wallet.wallet_name} className="matrix-line p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-mono text-sm truncate">
                      {wallet.wallet_name}
                    </span>
                    <MatrixCounterEffect 
                      value={wallet.balance} 
                      suffix=" sats"
                      className="text-green-400 font-mono font-bold"
                      animationDuration={200}
                      triggerDelay={0}
                      repeatInterval={0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Transactions */}
        <motion.div
          className="matrix-terminal p-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-green-400 font-mono mb-6 text-center">
            RECENT_TRANSACTIONS
          </h3>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-green-400/50 mx-auto mb-4" />
              <p className="text-green-400/70 font-mono">WAITING_FOR_TRANSACTIONS...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 5).map((tx, index) => (
                <motion.div
                  key={`${tx.received_at}-${index}`}
                  className="matrix-line p-4 hover:bg-green-900/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 font-mono font-bold">
                            {tx.amount} sats
                          </span>
                          {tx.is_zap && (
                            <span className="matrix-pill bg-purple-900/50 border-purple-400 text-purple-300 text-xs">
                              ZAP
                            </span>
                          )}
                        </div>
                        {tx.comment && (
                          <p className="text-green-300/70 text-sm font-mono mt-1">
                            "{tx.comment}"
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-green-400/70 font-mono text-sm">
                      {formatTimeAgo(tx.received_at)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NetworkStatsSection;
