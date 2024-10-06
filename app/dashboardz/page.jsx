'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Coins } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// Fetch coin data from an API
const getCoin = async (email) => {
  if (!email) return 0;
  try {
    const response = await fetch(`/api/coingetter?id=${email}`); // Use the user's email in the API call
    const data = await response.json();
    return data.points || 0; // Assuming API returns { points: <number> }
  } catch (error) {
    console.error('Error fetching coins:', error);
    return 0;
  }
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [coins, setCoins] = useState(1000); // Default coin value

  useEffect(() => {
    const fetchCoins = async () => {
      if (session?.user?.email) {
        const newCoins = await getCoin(session.user.email); // Pass session email to the API call
        setCoins(newCoins);
      }
    };

    // Fetch initial coin data
    fetchCoins();

    // Simulating coin updates every 30 seconds
    const interval = setInterval(() => {
      fetchCoins();
    }, 30000); // Fetch coins every 30 seconds

    return () => clearInterval(interval);
  }, [session]);

  // Use session data for name and email
  const username = session?.user?.name || 'CyberPioneer';
  const email = session?.user?.email || 'cyber@future.com';

  return (
    <div className="min-h-screen bg-white text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Futuristic Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 mr-2 text-blue-400" />
              <h2 className="text-xl font-semibold">Username</h2>
            </div>
            <p className="text-2xl font-bold text-blue-300">{username}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 mr-2 text-purple-400" />
              <h2 className="text-xl font-semibold">Email</h2>
            </div>
            <p className="text-2xl font-bold text-purple-300">{email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <Coins className="w-6 h-6 mr-2 text-yellow-400" />
              <h2 className="text-xl font-semibold">Remaining Coins</h2>
            </div>
            <div className="flex items-center">
              <p className="text-4xl font-bold text-yellow-300">{coins}</p>
              <div className="ml-4 h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(coins / 2000) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center flex gap-7">
          <button
            onClick={async () => {
              const newCoins = await getCoin(session?.user?.email);
              setCoins(newCoins);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Refresh Data
          </button>

        <Link href={'/shop'}>
          <button  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >Shop</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
