import { useEffect, useState } from "react"

export const useMediaQuery = () => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop" | null>(
    null
  )

  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    const checkDevice = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDevice("mobile")
      } else if (
        window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches
      ) {
        setDevice("tablet")
      } else {
        setDevice("desktop")
      }
    }

    const handleResize = () => {
      updateDimensions()
      checkDevice()
    }

    // Initialize dimensions and device
    updateDimensions()
    checkDevice()

    // Attach resize listener
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  }
}
