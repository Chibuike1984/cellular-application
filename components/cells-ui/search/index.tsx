"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, type HTMLMotionProps, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import React, {
  type FC,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const searchVariants = cva(
  "flex w-full items-center gap-2 rounded-full bg-white text-gray-200 text-sm ring transition-all duration-300 placeholder:text-gray-200 focus-within:ring-2 focus-within:ring-gray-200 md:w-[392px] md:focus-within:min-w-[430px]",
  {
    variants: {
      variant: {
        default: "ring ring-gray-200 hover:ring-gray-300",
        secondary: "bg-gray-50 ring-0 hover:bg-gray-100",
        tertiary: "shadow-sm ring-0 hover:shadow-md",
        ghost: "bg-transparent ring-0 hover:bg-gray-50",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-4 text-small",
        lg: "h-14 px-6 text-lg",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      disabled: false,
    },
  },
);

type SearchContextValue = {
  query: string;
  deferredQuery: string;
  handleSearch: (value: string) => void;
  clearSearch: () => void;
  isDisabled: boolean;
};

export interface SearchProviderProps
  extends VariantProps<typeof searchVariants>, React.PropsWithChildren {
  className?: string;
  onSearch?: (query: string) => void;
  initialFocus?: boolean;
  debounceDelay?: number;
  disabled?: boolean;
  defaultValue?: string;
}

interface SearchLabelProps extends React.PropsWithChildren {
  className?: string;
  htmlFor?: string;
}

interface SearchIconProps {
  className?: string;
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  "aria-label"?: string;
  icon?: React.ReactNode;
}

interface SearchFieldProps extends Omit<HTMLMotionProps<"input">, "onChange"> {
  showClearButton?: boolean;
  onChange?: (value: string) => void;
  animateClearButton?: boolean;
  debounce?: number;
}

const SearchContext = React.createContext<SearchContextValue | undefined>(
  undefined,
);

function SearchProvider({
  children,
  className,
  variant,
  size,
  onSearch,
  initialFocus = false,
  debounceDelay = 300,
  disabled = false,
  defaultValue = "",
}: SearchProviderProps) {
  const [query, setQuery] = useState(defaultValue);
  const deferredQuery = useDeferredValue(query);
  const formRef = useRef<HTMLFormElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  const clearSearch = useCallback(() => {
    setQuery("");
    onSearch?.("");
  }, [onSearch]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);

      // Clear previous timer if exists
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Set new timer if debounceDelay is provided
      debounceTimer.current = setTimeout(() => {
        onSearch?.(value);
      }, debounceDelay);
    },
    [onSearch, debounceDelay],
  );

  const value = useMemo(
    () => ({
      query,
      deferredQuery,
      handleSearch,
      clearSearch,
      isDisabled: disabled,
    }),
    [query, deferredQuery, handleSearch, clearSearch, disabled],
  );

  useEffect(() => {
    if (initialFocus && formRef.current) {
      const input = formRef.current.querySelector("input");
      input?.focus();
    }
  }, [initialFocus]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <SearchContext.Provider value={value}>
      <motion.form
        ref={formRef}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onSubmit={(e) => e.preventDefault()}
        className={cn(
          searchVariants({ variant, size, disabled, className }),
          disabled && "pointer-events-none",
        )}
        aria-labelledby="search-form-label"
        whileFocus={{ scale: 1.02 }}
        data-testid="search-form"
      >
        {children}
      </motion.form>
    </SearchContext.Provider>
  );
}

const SearchLabel: FC<SearchLabelProps> = ({
  className,
  children,
  htmlFor,
  ...props
}) => (
  <Label
    id="search-form-label"
    htmlFor={htmlFor}
    className={cn("sr-only", className)}
    {...props}
  >
    {children}
  </Label>
);

const SearchIcon: FC<SearchIconProps> = ({
  className,
  clickable = false,
  onClick,
  "aria-label": ariaLabel,
  icon,
  ...props
}) => {
  const context = useSearchContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else if (clickable && !context.isDisabled) {
      context.handleSearch(context.query);
    }
  };

  return (
    <motion.button
      type={clickable ? "button" : undefined}
      onClick={handleClick}
      disabled={context.isDisabled}
      whileHover={{ scale: context.isDisabled ? 1 : 1.1 }}
      whileTap={{ scale: context.isDisabled ? 1 : 0.95 }}
      className={cn(
        "text-gray-400",
        clickable &&
          !context.isDisabled &&
          "cursor-pointer transition-colors hover:text-gray-600",
        context.isDisabled && "cursor-not-allowed",
        className,
      )}
      aria-label={clickable ? ariaLabel || "Search" : undefined}
      aria-disabled={context.isDisabled}
      {...props}
    >
      <motion.div
        animate={{
          rotate: context.query ? [0, -10, 0] : 0,
          transition: { duration: 0.3 },
        }}
      >
        {icon || <Search className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
};

const SearchField: FC<SearchFieldProps> = ({
  className,
  placeholder = "Search...",
  showClearButton = true,
  animateClearButton = true,
  onChange,
  debounce = 0,
  disabled,
  ...props
}) => {
  const context = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    context.handleSearch(value);

    if (debounce > 0) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        onChange?.(value);
      }, debounce);
    } else {
      onChange?.(value);
    }
  };

  const handleClear = () => {
    context.clearSearch();
    inputRef.current?.focus();
    onChange?.("");
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="relative flex-1">
      <motion.input
        ref={inputRef}
        type="text"
        value={context.query}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled ?? context.isDisabled}
        className={cn(
          "w-full border-none bg-transparent outline-none",
          "text-gray-800 placeholder:text-gray-400",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        whileFocus={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        aria-disabled={disabled ?? context.isDisabled}
        data-testid="search-input"
        {...props}
      />
      <AnimatePresence>
        {showClearButton && context.query && !context.isDisabled && (
          <motion.button
            initial={animateClearButton ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={animateClearButton ? { opacity: 0, scale: 0.8 } : {}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            type="button"
            onClick={handleClear}
            className="-translate-y-1/2 absolute top-1/2 right-0"
            aria-label="Clear search"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-testid="clear-button"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

function useSearchContext(): SearchContextValue {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(
      "Search components must be used within a SearchProvider. Wrap your search components in <SearchProvider> and try again.",
    );
  }
  return context;
}

export {
  SearchField,
  SearchIcon,
  SearchLabel,
  SearchProvider,
  useSearchContext,
};
