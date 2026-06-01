import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./Avatar.css";

type AvatarSize = "sm" | "md" | "lg";
type AvatarImageStatus = "idle" | "loading" | "loaded" | "error";

interface AvatarContextValue {
  size: AvatarSize;
  imageStatus: AvatarImageStatus;
  setImageStatus: (status: AvatarImageStatus) => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  size?: AvatarSize;
}

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    const [imageStatus, setImageStatus] = useState<AvatarImageStatus>("idle");

    return (
      <AvatarContext.Provider value={{ size, imageStatus, setImageStatus }}>
        <span
          ref={ref}
          className={cn("lumen-avatar", `lumen-avatar--${size}`, className)}
          {...props}
        >
          {children}
        </span>
      </AvatarContext.Provider>
    );
  },
);

Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = "", src, onLoad, onError, ...props }, ref) => {
    const context = useContext(AvatarContext);
    const { size, setImageStatus } = context ?? {
      size: "md" as const,
      setImageStatus: () => undefined,
    };

    useEffect(() => {
      if (src) {
        setImageStatus("loading");
      } else {
        setImageStatus("idle");
      }
    }, [setImageStatus, src]);

    const setRefs = (node: HTMLImageElement | null) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }

      if (node?.complete && node.naturalWidth > 0) {
        setImageStatus("loaded");
      }
    };

    if (context?.imageStatus === "error") {
      return null;
    }

    return (
      <img
        ref={setRefs}
        alt={alt}
        src={src}
        className={cn("lumen-avatar__image", `lumen-avatar__image--${size}`, className)}
        onLoad={(event) => {
          onLoad?.(event);
          setImageStatus("loaded");
        }}
        onError={(event) => {
          onError?.(event);
          setImageStatus("error");
        }}
        {...props}
      />
    );
  },
);

AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(AvatarContext);

    if (context?.imageStatus === "loaded") {
      return null;
    }

    return (
      <span ref={ref} className={cn("lumen-avatar__fallback", className)} {...props}>
        {children}
      </span>
    );
  },
);

AvatarFallback.displayName = "AvatarFallback";
