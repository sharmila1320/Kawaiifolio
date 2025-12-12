import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PinData, PinType } from '../types';

interface PinProps {
  data: PinData;
  onClick: (data: PinData) => void;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent) => void;
}

const Pin: React.FC<PinProps> = ({ data, onClick, isSaved, onToggleSave }) => {
  const isImagePin = !!data.imageUrl;
  
  const minHeightClass = data.size === 'large' ? 'min-h-[400px]' : data.size === 'medium' ? 'min-h-[250px]' : 'min-h-[150px]';

  const SaveButton = ({ className }: { className?: string }) => (
    <motion.button
      onClick={onToggleSave}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      // Pulse animation when isSaved becomes true
      animate={isSaved ? { scale: [1, 1.15, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`px-4 py-2 rounded-full font-bold text-sm shadow-md transition-colors duration-300 flex items-center gap-2 ${
        isSaved 
          ? 'bg-slate-900 text-white' 
          : 'bg-red-500 text-white hover:bg-red-600'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSaved ? (
          <motion.div
            key="saved"
            className="flex items-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <span>Saved</span>
            <motion.span 
              initial={{ scale: 0, rotate: -45 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 15,
                delay: 0.1 
              }}
              className="text-base leading-none"
            >
              ✓
            </motion.span>
          </motion.div>
        ) : (
          <motion.span
            key="save"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            Save
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring' }}
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      onClick={() => onClick(data)}
      className={`break-inside-avoid mb-6 rounded-3xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 ${data.color} relative group`}
    >
      {isImagePin && (
        <div className="relative overflow-hidden">
          <img 
            src={data.imageUrl} 
            alt={data.title} 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Overlay Button for Image Pins */}
          <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
             <SaveButton />
          </div>
        </div>
      )}

      {/* Button for Text Pins */}
      {!isImagePin && (
        <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <SaveButton />
        </div>
      )}

      <div className={`p-5 relative ${!isImagePin ? minHeightClass + ' flex flex-col justify-between' : ''}`}>
        <div>
          {/* Header Row */}
          <div className={`flex justify-between items-start mb-2 ${!isImagePin ? 'pr-20' : ''}`}>
             <span className={`text-xs font-bold uppercase tracking-wider opacity-50 ${data.color?.includes('text-white') ? 'text-white' : 'text-slate-800 dark:text-white'}`}>{data.type}</span>
             <span className={`${data.color?.includes('text-white') ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                {data.type === PinType.PROJECT && <span className="text-xl">🚀</span>}
                {data.type === PinType.SKILL && <span className="text-xl">⚡</span>}
                {data.type === PinType.EXPERIENCE && <span className="text-xl">💼</span>}
             </span>
          </div>
          <h3 className={`font-display font-bold text-xl mb-2 leading-tight ${data.color?.includes('text-white') ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
            {data.title}
          </h3>
          <p className={`text-sm leading-relaxed ${data.color?.includes('text-white') ? 'text-gray-300' : 'text-slate-600 dark:text-slate-200'}`}>
            {data.description}
          </p>
        </div>

        {data.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {data.tags.map(tag => (
              <span key={tag} className={`text-xs px-2 py-1 rounded-md font-medium ${data.color?.includes('text-white') ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-100'}`}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Pin;