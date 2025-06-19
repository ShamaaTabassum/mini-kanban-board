import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react'

const Loader = () => {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-8 w-8 text-violet-600" />
          </motion.div>
        </div>
      </div>
    );
}

export default Loader