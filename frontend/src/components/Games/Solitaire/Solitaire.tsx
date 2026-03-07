import React, { useState, useCallback, useRef, useEffect } from 'react';

// --- Types ---

type Suit = 'S' | 'H' | 'D' | 'C';
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

interface GameState {
  stock: Card[];
  waste: Card[];
  foundations: Card[][]; // 4 piles
  tableau: Card[][];     // 7 piles
  score: number;
  moves: number;
  won: boolean;
}

// --- Constants ---

const CARD_W = 60;
const CARD_H = 84;
const SUITS: Suit[] = ['S', 'H', 'D', 'C'];
const SUIT_SYMBOLS: Record<Suit, string> = { S: '\u2660', H: '\u2665', D: '\u2666', C: '\u2663' };
const RANK_LABELS: Record<number, string> = {
  1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7',
  8: '8', 9: '9', 10: '10', 11: 'J', 12: 'Q', 13: 'K',
};

function isRed(suit: Suit): boolean {
  return suit === 'H' || suit === 'D';
}

function suitColor(suit: Suit): string {
  return isRed(suit) ? '#cc0000' : '#000000';
}

// --- Deck helpers ---

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank++) {
      deck.push({ suit, rank: rank as Rank, faceUp: false });
    }
  }
  return deck;
}

function shuffle(deck: Card[]): Card[] {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function dealGame(): GameState {
  const deck = shuffle(createDeck());
  const tableau: Card[][] = [[], [], [], [], [], [], []];
  let idx = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = { ...deck[idx++] };
      card.faceUp = row === col;
      tableau[col].push(card);
    }
  }
  const stock = deck.slice(idx).map((c) => ({ ...c, faceUp: false }));
  return {
    stock,
    waste: [],
    foundations: [[], [], [], []],
    tableau,
    score: 0,
    moves: 0,
    won: false,
  };
}

// --- Selection state ---

type Selection =
  | { type: 'waste' }
  | { type: 'tableau'; col: number; cardIndex: number }
  | null;

// --- Component ---

export const Solitaire: React.FC = () => {
  const [game, setGame] = useState<GameState>(() => dealGame());
  const [selection, setSelection] = useState<Selection>(null);

  const newGame = useCallback(() => {
    setGame(dealGame());
    setSelection(null);
  }, []);

  // --- Helpers on game state ---

  function canPlaceOnFoundation(card: Card, foundation: Card[]): boolean {
    if (foundation.length === 0) return card.rank === 1;
    const top = foundation[foundation.length - 1];
    return top.suit === card.suit && card.rank === top.rank + 1;
  }

  function canPlaceOnTableau(card: Card, pile: Card[]): boolean {
    if (pile.length === 0) return card.rank === 13;
    const top = pile[pile.length - 1];
    if (!top.faceUp) return false;
    return isRed(card.suit) !== isRed(top.suit) && card.rank === top.rank - 1;
  }

  function checkWin(state: GameState): boolean {
    return state.foundations.every((f) => f.length === 13);
  }

  // --- Actions ---

  function drawFromStock() {
    setSelection(null);
    setGame((prev) => {
      if (prev.won) return prev;
      const next = cloneState(prev);
      if (next.stock.length === 0) {
        // Recycle waste back to stock
        next.stock = next.waste.reverse().map((c) => ({ ...c, faceUp: false }));
        next.waste = [];
        // Penalty for recycling (classic Windows scoring)
        next.score = Math.max(0, next.score - 20);
      } else {
        const card = next.stock.pop()!;
        card.faceUp = true;
        next.waste.push(card);
      }
      return next;
    });
  }

  function handleWasteClick() {
    if (game.waste.length === 0) return;
    if (selection?.type === 'waste') {
      setSelection(null);
      return;
    }
    setSelection({ type: 'waste' });
  }

  function handleWasteDoubleClick() {
    if (game.waste.length === 0) return;
    setSelection(null);
    setGame((prev) => {
      const next = cloneState(prev);
      const card = next.waste[next.waste.length - 1];
      for (let i = 0; i < 4; i++) {
        if (canPlaceOnFoundation(card, next.foundations[i])) {
          next.waste.pop();
          next.foundations[i].push({ ...card });
          next.score += 10;
          next.moves++;
          next.won = checkWin(next);
          return next;
        }
      }
      return prev;
    });
  }

  function handleTableauClick(col: number, cardIndex: number) {
    const pile = game.tableau[col];
    const card = pile[cardIndex];
    if (!card.faceUp) return;

    // If we have a selection, try to move
    if (selection) {
      tryMove(col);
      return;
    }

    // Select this card (and everything below it)
    setSelection({ type: 'tableau', col, cardIndex });
  }

  function handleTableauDoubleClick(col: number, cardIndex: number) {
    const pile = game.tableau[col];
    if (cardIndex !== pile.length - 1) return; // only top card
    const card = pile[cardIndex];
    if (!card.faceUp) return;

    setSelection(null);
    setGame((prev) => {
      const next = cloneState(prev);
      const srcPile = next.tableau[col];
      const topCard = srcPile[srcPile.length - 1];
      for (let i = 0; i < 4; i++) {
        if (canPlaceOnFoundation(topCard, next.foundations[i])) {
          srcPile.pop();
          next.foundations[i].push({ ...topCard });
          next.score += 10;
          next.moves++;
          // Flip newly exposed card
          if (srcPile.length > 0 && !srcPile[srcPile.length - 1].faceUp) {
            srcPile[srcPile.length - 1].faceUp = true;
            next.score += 5;
          }
          next.won = checkWin(next);
          return next;
        }
      }
      return prev;
    });
  }

  function handleFoundationClick(foundationIndex: number) {
    if (!selection) return;
    setGame((prev) => {
      const next = cloneState(prev);
      let card: Card | undefined;

      if (selection.type === 'waste') {
        card = next.waste[next.waste.length - 1];
        if (card && canPlaceOnFoundation(card, next.foundations[foundationIndex])) {
          next.waste.pop();
          next.foundations[foundationIndex].push({ ...card });
          next.score += 10;
          next.moves++;
          next.won = checkWin(next);
          setSelection(null);
          return next;
        }
      } else if (selection.type === 'tableau') {
        const srcPile = next.tableau[selection.col];
        // Only single card (top card) can go to foundation
        if (selection.cardIndex === srcPile.length - 1) {
          card = srcPile[srcPile.length - 1];
          if (card && canPlaceOnFoundation(card, next.foundations[foundationIndex])) {
            srcPile.pop();
            next.foundations[foundationIndex].push({ ...card });
            next.score += 10;
            next.moves++;
            if (srcPile.length > 0 && !srcPile[srcPile.length - 1].faceUp) {
              srcPile[srcPile.length - 1].faceUp = true;
              next.score += 5;
            }
            next.won = checkWin(next);
            setSelection(null);
            return next;
          }
        }
      }
      setSelection(null);
      return prev;
    });
  }

  function handleEmptyTableauClick(col: number) {
    if (!selection) return;
    tryMove(col);
  }

  function tryMove(targetCol: number) {
    setGame((prev) => {
      const next = cloneState(prev);

      if (selection!.type === 'waste') {
        const card = next.waste[next.waste.length - 1];
        if (card && canPlaceOnTableau(card, next.tableau[targetCol])) {
          next.waste.pop();
          next.tableau[targetCol].push({ ...card, faceUp: true });
          next.score += 5;
          next.moves++;
          setSelection(null);
          return next;
        }
      } else if (selection!.type === 'tableau') {
        const sel = selection as { type: 'tableau'; col: number; cardIndex: number };
        if (sel.col === targetCol) {
          setSelection(null);
          return prev;
        }
        const srcPile = next.tableau[sel.col];
        const movingCards = srcPile.slice(sel.cardIndex);
        if (movingCards.length > 0 && canPlaceOnTableau(movingCards[0], next.tableau[targetCol])) {
          next.tableau[sel.col] = srcPile.slice(0, sel.cardIndex);
          next.tableau[targetCol] = [...next.tableau[targetCol], ...movingCards];
          next.moves++;
          // Flip newly exposed card
          const newSrc = next.tableau[sel.col];
          if (newSrc.length > 0 && !newSrc[newSrc.length - 1].faceUp) {
            newSrc[newSrc.length - 1].faceUp = true;
            next.score += 5;
          }
          setSelection(null);
          return next;
        }
      }

      setSelection(null);
      return prev;
    });
  }

  function cloneState(state: GameState): GameState {
    return {
      stock: state.stock.map((c) => ({ ...c })),
      waste: state.waste.map((c) => ({ ...c })),
      foundations: state.foundations.map((f) => f.map((c) => ({ ...c }))),
      tableau: state.tableau.map((p) => p.map((c) => ({ ...c }))),
      score: state.score,
      moves: state.moves,
      won: state.won,
    };
  }

  // --- Rendering helpers ---

  function renderCardBack() {
    return (
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 3,
          border: '1px solid #000',
          background: '#0000aa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        {/* Crosshatch pattern via CSS */}
        <div
          style={{
            width: CARD_W - 8,
            height: CARD_H - 8,
            borderRadius: 2,
            border: '2px solid #4444cc',
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 3px,
                #3333bb 3px,
                #3333bb 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                #3333bb 3px,
                #3333bb 4px
              )
            `,
          }}
        />
      </div>
    );
  }

  function renderCard(card: Card, isSelected: boolean = false) {
    if (!card.faceUp) return renderCardBack();
    const color = suitColor(card.suit);
    const symbol = SUIT_SYMBOLS[card.suit];
    const label = RANK_LABELS[card.rank];
    return (
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 3,
          border: isSelected ? '2px solid #0000ff' : '1px solid #000',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          boxSizing: 'border-box',
          position: 'relative',
          userSelect: 'none',
          boxShadow: isSelected ? '0 0 0 2px #0000ff' : 'none',
        }}
      >
        {/* Top left */}
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 3,
            color,
            fontSize: 11,
            fontWeight: 'bold',
            lineHeight: '12px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <div>{label}</div>
          <div style={{ fontSize: 10 }}>{symbol}</div>
        </div>
        {/* Center */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
            fontSize: 24,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {symbol}
        </div>
        {/* Bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 2,
            right: 3,
            color,
            fontSize: 11,
            fontWeight: 'bold',
            lineHeight: '12px',
            fontFamily: 'Arial, sans-serif',
            transform: 'rotate(180deg)',
          }}
        >
          <div>{label}</div>
          <div style={{ fontSize: 10 }}>{symbol}</div>
        </div>
      </div>
    );
  }

  function renderEmptySlot(onClick?: () => void, label?: string) {
    return (
      <div
        onClick={onClick}
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 3,
          border: '2px solid #006600',
          background: 'rgba(0,100,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: onClick ? 'pointer' : 'default',
          boxSizing: 'border-box',
          color: '#006600',
          fontSize: 20,
        }}
      >
        {label || ''}
      </div>
    );
  }

  const isCardSelected = (sel: Selection, type: string, col?: number, idx?: number): boolean => {
    if (!sel) return false;
    if (type === 'waste' && sel.type === 'waste') return true;
    if (
      type === 'tableau' &&
      sel.type === 'tableau' &&
      sel.col === col &&
      idx !== undefined &&
      idx >= sel.cardIndex
    )
      return true;
    return false;
  };

  const FIELD_W = 7 * (CARD_W + 10) + 10;
  const CASCADE_FACE_DOWN = 15;
  const CASCADE_FACE_UP = 22;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        const needed = FIELD_W + 16; // padding
        if (parentWidth < needed) {
          setScale(parentWidth / needed);
        } else {
          setScale(1);
        }
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [FIELD_W]);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', background: '#c0c0c0' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#c0c0c0',
        padding: 4,
        fontFamily: 'Arial, sans-serif',
        transform: scale < 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        width: scale < 1 ? `${100 / scale}%` : undefined,
      }}
    >
      {/* Header */}
      <div
        style={{
          width: FIELD_W,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px 8px',
          marginBottom: 4,
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={newGame}
          style={{ fontSize: 11, padding: '2px 12px', cursor: 'pointer' }}
        >
          Deal New Game
        </button>
        <div style={{ display: 'flex', gap: 16 }}>
          <div
            className="sunken-panel"
            style={{
              padding: '2px 8px',
              background: '#000',
              color: '#ff0000',
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 'bold',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            Score: {game.score}
          </div>
          <div
            className="sunken-panel"
            style={{
              padding: '2px 8px',
              background: '#000',
              color: '#ff0000',
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 'bold',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            Moves: {game.moves}
          </div>
        </div>
      </div>

      {/* Playing field */}
      <div
        className="sunken-panel"
        style={{
          width: FIELD_W,
          minHeight: 500,
          background: '#008000',
          padding: 10,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Top row: stock/waste on left, foundations on right */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          {/* Stock and Waste */}
          <div style={{ display: 'flex', gap: 10 }}>
            {/* Stock */}
            <div onClick={drawFromStock}>
              {game.stock.length > 0 ? (
                renderCardBack()
              ) : (
                renderEmptySlot(drawFromStock, '\u21BB')
              )}
            </div>
            {/* Waste */}
            <div
              onClick={handleWasteClick}
              onDoubleClick={handleWasteDoubleClick}
            >
              {game.waste.length > 0 ? (
                renderCard(
                  game.waste[game.waste.length - 1],
                  isCardSelected(selection, 'waste')
                )
              ) : (
                renderEmptySlot()
              )}
            </div>
          </div>

          {/* Foundations */}
          <div style={{ display: 'flex', gap: 10 }}>
            {game.foundations.map((foundation, i) => (
              <div key={`f-${i}`} onClick={() => handleFoundationClick(i)}>
                {foundation.length > 0 ? (
                  renderCard(foundation[foundation.length - 1])
                ) : (
                  renderEmptySlot(() => handleFoundationClick(i), SUIT_SYMBOLS[SUITS[i]])
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div style={{ display: 'flex', gap: 10 }}>
          {game.tableau.map((pile, col) => (
            <div
              key={`t-${col}`}
              style={{
                width: CARD_W,
                minHeight: CARD_H + 40,
                position: 'relative',
              }}
            >
              {pile.length === 0 ? (
                <div onClick={() => handleEmptyTableauClick(col)}>
                  {renderEmptySlot(() => handleEmptyTableauClick(col))}
                </div>
              ) : (
                pile.map((card, idx) => {
                  let top = 0;
                  for (let k = 0; k < idx; k++) {
                    top += pile[k].faceUp ? CASCADE_FACE_UP : CASCADE_FACE_DOWN;
                  }
                  return (
                    <div
                      key={`t-${col}-${idx}`}
                      style={{
                        position: 'absolute',
                        top,
                        left: 0,
                        zIndex: idx,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (card.faceUp) {
                          handleTableauClick(col, idx);
                        }
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        if (card.faceUp) {
                          handleTableauDoubleClick(col, idx);
                        }
                      }}
                    >
                      {card.faceUp
                        ? renderCard(card, isCardSelected(selection, 'tableau', col, idx))
                        : renderCardBack()}
                    </div>
                  );
                })
              )}
            </div>
          ))}
        </div>

        {/* Win overlay */}
        {game.won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.75)',
              zIndex: 100,
              borderRadius: 3,
            }}
          >
            <div
              style={{
                color: '#ffff00',
                fontSize: 28,
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif',
                marginBottom: 8,
              }}
            >
              YOU WIN!
            </div>
            <div
              style={{
                color: '#ffffff',
                fontSize: 16,
                fontFamily: 'monospace',
                marginBottom: 16,
              }}
            >
              Score: {game.score} | Moves: {game.moves}
            </div>
            <button
              onClick={newGame}
              style={{ fontSize: 14, padding: '4px 20px', cursor: 'pointer' }}
            >
              Deal New Game
            </button>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div style={{ marginTop: 4, fontSize: 10, color: '#808080', textAlign: 'center' }}>
        Click to select, click target to move | Double-click to send to foundation
      </div>
    </div>
    </div>
  );
};
