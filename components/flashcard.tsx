"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BookmarkIcon, CheckCircle2, XCircle, ChevronRight } from "lucide-react"
import type { IntegrityCard } from "@/lib/orion-integrity-cards"

interface FlashcardProps {
  card: IntegrityCard
  onMastered?: (cardId: number) => void
  isMastered?: boolean
  onBookmark?: (cardId: number) => void
  isBookmarked?: boolean
}

export function Flashcard({ card, onMastered, isMastered, onBookmark, isBookmarked }: FlashcardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-lg",
        "border-2 overflow-hidden",
        card.category === "ok"
          ? "border-ok/30 bg-ok-light hover:border-ok/50"
          : "border-rogue/30 bg-rogue-light hover:border-rogue/50",
        isExpanded && "ring-2 ring-primary/20",
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-1">
            <Badge
              variant="outline"
              className={cn(
                "font-mono text-xs shrink-0",
                card.category === "ok" ? "border-ok text-ok bg-ok/10" : "border-rogue text-rogue bg-rogue/10",
              )}
            >
              {card.codename}
            </Badge>
            <Badge
              className={cn(
                "text-xs font-semibold shrink-0",
                card.category === "ok" ? "bg-ok text-ok-foreground" : "bg-rogue text-rogue-foreground",
              )}
            >
              {card.category === "ok" ? (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-1" /> OK
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3 mr-1" /> ROGUE
                </>
              )}
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              onBookmark?.(card.id)
            }}
          >
            <BookmarkIcon className={cn("h-4 w-4", isBookmarked && "fill-current text-primary")} />
          </Button>
        </div>

        {/* Term */}
        <h3 className="text-xl font-bold mb-3 text-balance leading-tight">{card.term}</h3>

        {/* Definition - always visible */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed text-foreground/80">{card.definition}</p>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
            {card.examples && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <div className={cn("w-1 h-4 rounded-full", card.category === "ok" ? "bg-ok" : "bg-rogue")} />
                  Examples
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground pl-3">{card.examples}</p>
              </div>
            )}

            {card.analogy && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <div className={cn("w-1 h-4 rounded-full", card.category === "ok" ? "bg-ok" : "bg-rogue")} />
                  Analogy
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground pl-3 italic">{card.analogy}</p>
              </div>
            )}

            {/* Tags */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Related Topics</h4>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Learn More"}
            <ChevronRight className={cn("ml-1 h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
          </Button>

          <Button
            variant={isMastered ? "secondary" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onMastered?.(card.id)
            }}
            className={cn(isMastered && "bg-primary/10 text-primary border-primary/30")}
          >
            {isMastered ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1" /> Mastered
              </>
            ) : (
              "Mark as Mastered"
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
