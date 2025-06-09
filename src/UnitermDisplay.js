import React from 'react';
import { Box } from '@mui/material';

function UnitermDisplay({ parallelData, eliminationData }) {
  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      {/* Parallel Data Display */}
      <Box sx={{ mb: 4 }}>
        <h3>Parallel Uniterms</h3>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {parallelData.map((item, i) => (
            <Box key={i} sx={{ position: 'relative', width: '150px', height: '80px' }}>
              {/* Drawing the parallel uniterm */}
              <svg width="150" height="80">
                {/* Horizontal line */}
                <line x1="10" y1="20" x2="140" y2="20" stroke="black" strokeWidth="2" />
                {/* Vertical lines */}
                <line x1="10" y1="20" x2="10" y2="40" stroke="black" strokeWidth="2" />
                <line x1="140" y1="20" x2="140" y2="40" stroke="black" strokeWidth="2" />
                
                {/* Merged indicator if applicable */}
                {item.merged && (
                  <>
                    <line 
                      x1={item.merged_on === 'value1' ? "30" : "80"} 
                      y1="20" 
                      x2={item.merged_on === 'value1' ? "30" : "80"} 
                      y2="15" 
                      stroke="black" 
                      strokeWidth="2" 
                    />
                    <line 
                      x1={item.merged_on === 'value1' ? "30" : "80"} 
                      y1="15" 
                      x2={item.merged_on === 'value1' ? "80" : "130"} 
                      y2="15" 
                      stroke="black" 
                      strokeWidth="2" 
                    />
                    <line 
                      x1={item.merged_on === 'value1' ? "80" : "130"} 
                      y1="20" 
                      x2={item.merged_on === 'value1' ? "80" : "130"} 
                      y2="15" 
                      stroke="black" 
                      strokeWidth="2" 
                    />
                  </>
                )}
                
                {/* Text */}
                <text x="75" y="60" textAnchor="middle" fontSize="12">
                  {item.value1} {item.sep} {item.value2}
                </text>
              </svg>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Elimination Data Display */}
      <Box>
        <h3>Elimination Uniterms</h3>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {eliminationData.map((item, i) => (
            <Box key={i} sx={{ position: 'relative', width: '150px', height: '60px' }}>
              <svg width="150" height="60">
                {/* Horizontal line */}
                <line x1="10" y1="30" x2="140" y2="30" stroke="black" strokeWidth="2" />
                {/* Vertical markers */}
                <text x="10" y="30" textAnchor="middle" fontSize="12" dy=".3em">|</text>
                <text x="140" y="30" textAnchor="middle" fontSize="12" dy=".3em">|</text>
                {/* Text */}
                <text x="75" y="50" textAnchor="middle" fontSize="12">
                  {item.tekst1} {item.sep} {item.tekst2} {item.sep} {item.tekst3}
                </text>
              </svg>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UnitermDisplay;