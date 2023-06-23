import { useState } from "react";

interface UseDisclosureParams {
  defaultIsOpen?: boolean;
}

export const useDisclosure = ({ defaultIsOpen = false }: UseDisclosureParams = {}) => {
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
