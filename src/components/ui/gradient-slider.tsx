// Enhanced Gradient Slider Component based on user's demo

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[280px] rounded-lg border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {props.children}
      {showArrow && (
        <TooltipPrimitive.Arrow className="-my-px fill-popover drop-shadow-[0_1px_0_hsl(var(--border))]" />
      )}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface GradientSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showTooltip?: boolean;
  tooltipContent?: (value: number) => React.ReactNode;
  gradientColors?: string[];
}

const GradientSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  GradientSliderProps
>(({ 
  className, 
  showTooltip = true, 
  tooltipContent, 
  gradientColors = ["#10b981", "#eab308", "#ef4444"],
  defaultValue = [0],
  ...props 
}, ref) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<number[]>(
    (props.defaultValue as number[]) ?? (props.value as number[]) ?? defaultValue,
  );

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    props.onValueChange?.(newValue);
  };

  const handlePointerDown = () => {
    if (showTooltip) {
      setShowTooltipState(true);
    }
  };

  const handlePointerUp = React.useCallback(() => {
    if (showTooltip) {
      setShowTooltipState(false);
    }
  }, [showTooltip]);

  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [showTooltip, handlePointerUp]);

  const gradientStyle = React.useMemo(() => {
    const colorStops = gradientColors.map((color, index) => 
      `${color} ${(index / (gradientColors.length - 1)) * 100}%`
    ).join(", ");
    return `linear-gradient(90deg, ${colorStops})`;
  }, [gradientColors]);

  const renderThumb = (value: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        className="block h-6 w-6 rounded-full border-2 border-white bg-white shadow-lg transition-all duration-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-ring/40 data-[disabled]:cursor-not-allowed hover:scale-110 active:scale-95"
        onPointerDown={handlePointerDown}
        style={{
          background: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)"
        }}
      />
    );

    if (!showTooltip) return thumb;

    return (
      <TooltipProvider>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger asChild>{thumb}</TooltipTrigger>
          <TooltipContent
            className="px-3 py-2 text-sm bg-background border border-border shadow-lg"
            sideOffset={12}
            side={props.orientation === "vertical" ? "right" : "top"}
          >
            <p className="font-medium">{tooltipContent ? tooltipContent(value) : value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
        className,
      )}
      onValueChange={handleValueChange}
      defaultValue={defaultValue}
      {...props}
    >
      <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-secondary/20 backdrop-blur-sm data-[orientation=horizontal]:h-3 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-3 shadow-inner">
        <div 
          className="absolute inset-0 rounded-full"
          style={{ background: gradientStyle }}
        />
        <SliderPrimitive.Range 
          className="absolute rounded-full opacity-80 data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          style={{ 
            background: gradientStyle,
            filter: "brightness(1.1) saturate(1.2)"
          }}
        />
      </SliderPrimitive.Track>
      {internalValue?.map((value, index) => (
        <React.Fragment key={index}>{renderThumb(value)}</React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});

GradientSlider.displayName = "GradientSlider";

export { GradientSlider };
