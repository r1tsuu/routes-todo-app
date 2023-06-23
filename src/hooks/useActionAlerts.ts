import { DisclosureReturn, useDisclosure } from "./useDisclosure";

export const useActionAlerts = () => {
  const createPathAlert = useDisclosure();
  const updatePathAlert = useDisclosure();
  const deletePathAlert = useDisclosure();

  const item = (disclosure: DisclosureReturn, title: string) => ({
    open: disclosure.isOpen,
    onClose: disclosure.onClose,
    title,
  });

  return {
    openCreate: createPathAlert.onOpen,
    openUpdate: updatePathAlert.onOpen,
    openDelete: deletePathAlert.onOpen,
    list: [
      item(createPathAlert, "Path has been successfully added"),
      item(deletePathAlert, "Path has been successfully deleted"),
      item(updatePathAlert, "Path has been successfully updated"),
    ],
  };
};
