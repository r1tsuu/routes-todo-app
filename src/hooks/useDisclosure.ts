import { useState } from "react";

interface UseDisclosureParams {
  defaultIsOpen?: boolean;
}

export interface DisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useDisclosure = ({
  defaultIsOpen = false,
}: UseDisclosureParams = {}): DisclosureReturn => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};
