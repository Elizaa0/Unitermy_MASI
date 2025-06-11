import React from "react";
import { Stage, Layer, Line, Text, Group } from "react-konva";

const HorizontalHalfRect = ({ x, y, width, height, strokeWidth = 4, children }) => {
  const short = 20;
  return (
    <Group x={x} y={y}>
      <Line points={[0, 0, width, 0]} stroke="black" strokeWidth={strokeWidth} />
      <Line points={[0, 0, 0, short]} stroke="black" strokeWidth={strokeWidth} />
      <Line points={[width, 0, width, short]} stroke="black" strokeWidth={strokeWidth} />
      {children}
    </Group>
  );
};

const VerticalHalfRect = ({ x, y, width, height, strokeWidth = 4, children }) => {
  const short = 20;
  return (
    <Group x={x} y={y}>
      <Line points={[0, 0, 0, height]} stroke="black" strokeWidth={strokeWidth} />
      <Line points={[0, 0, short, 0]} stroke="black" strokeWidth={strokeWidth} />
      <Line points={[0, height, short, height]} stroke="black" strokeWidth={strokeWidth} />
      {children}
    </Group>
  );
};

const UnitermParallel = ({ horizontalUniterm, verticalUniterm, result, showResult, selectedPosition }) => {
  const formatText = (text) => text.replace(/[()]/g, '').replace(/\s*;\s*/g, '\n;\n');

  const splitTopLevelUniterm = (str) => {
    let depth = 0;
    let splitIdx = -1;
    
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') depth++;
      else if (str[i] === ')') depth--;
      else if (str[i] === ';' && depth === 0) {
        splitIdx = i;
        break;
      }
    }
    
    if (splitIdx === -1) return [str.trim(), ''];
    return [
      str.slice(0, splitIdx).trim(),
      str.slice(splitIdx + 1).trim()
    ];
  };

  const parseResult = () => {
    if (!result) return { left: '', right: '' };
    const [left, right] = splitTopLevelUniterm(result);
    return { left, right };
  };

  const { left, right } = parseResult();

  return (
    <div className="visualization-container">
      <Stage width={800} height={300}>
        <Layer>
          {horizontalUniterm && (
            <>
              <Text text="Uniterm pierwszy:" x={50} y={20} fontSize={14} fontFamily="Arial" />
              <HorizontalHalfRect x={50} y={40} width={150} height={60} strokeWidth={5}>
                <Text
                  text={horizontalUniterm}
                  x={15}
                  y={20}
                  fontSize={18}
                  fontFamily="Arial"
                  fill="black"
                />
              </HorizontalHalfRect>
            </>
          )}

          {verticalUniterm && (
            <>
              <Text text="Uniterm drugi:" x={250} y={20} fontSize={14} fontFamily="Arial" />
              <VerticalHalfRect x={250} y={40} width={100} height={120} strokeWidth={5}>
                <Text
                  text={formatText(verticalUniterm)}
                  x={25}
                  y={40}
                  fontSize={16}
                  fontFamily="Arial"
                  fill="black"
                  align="center"
                />
              </VerticalHalfRect>
            </>
          )}

          {showResult && result && (
            <>
              <Line points={[380, 100, 450, 100]} stroke="black" strokeWidth={3} />
              <Line
                points={[440, 90, 450, 100, 440, 110]}
                stroke="black"
                strokeWidth={3}
                lineCap="round"
                lineJoin="round"
              />
              
              <Text text="Po zrównolegleniu:" x={480} y={20} fontSize={14} fontFamily="Arial" />
              <Group x={480} y={40}>
                <HorizontalHalfRect width={250} height={120} strokeWidth={5}>
                  {selectedPosition === 'A' ? (
                    <>
                      <Group x={10} y={15}>
                        <VerticalHalfRect width={150} height={90} strokeWidth={5}>
                          <Text
                            text={formatText(left)}
                            x={25}
                            y={25}
                            fontSize={16}
                            fontFamily="Arial"
                            align="center"
                          />
                        </VerticalHalfRect>
                      </Group>
                      <Text text={`; ${right}`} x={170} y={45} fontSize={18} fontFamily="Arial" />
                    </>
                  ) : (
                    <>
                      <Text text={`${left} ;`} x={15} y={45} fontSize={18} fontFamily="Arial" />
                      <Group x={100} y={15}>
                        <VerticalHalfRect width={150} height={90} strokeWidth={5}>
                          <Text
                            text={formatText(right)}
                            x={25}
                            y={25}
                            fontSize={16}
                            fontFamily="Arial"
                            align="center"
                          />
                        </VerticalHalfRect>
                      </Group>
                    </>
                  )}
                </HorizontalHalfRect>
              </Group>
            </>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default UnitermParallel;
