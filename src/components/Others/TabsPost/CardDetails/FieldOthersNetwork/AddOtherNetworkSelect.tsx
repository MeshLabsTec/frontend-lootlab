"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, X, Hexagon } from "lucide-react";
import type { FormData } from "../../schemas";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AccordionContent } from "@/components/ui/accordion";
import AccordionManager from "../../AccordionManager";
import { getCoinIcons } from "./getCoinIcons";

// Definir os tipos de rede disponíveis
const networkTypes = [
  "BTC",
  "RON",
  "ETH",
  "SOL",
  "BNB",
  "MATIC",
  "AVAX",
  "ADA",
  "DOT",
  "ARB",
  "IMX",
  "PoP",
];

// Componente para ícone padrão quando não existir um ícone específico
const DefaultNetworkIcon = () => (
  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-900/40">
    <Hexagon className="h-3 w-3 text-blue-300" />
  </div>
);

function AddOtherNetworkSelect() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [coinIcons, setCoinIcons] = useState<Record<string, string>>({});

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  const otherNetworks = watch("network_secondary") || [];

  useEffect(() => {
    if (!otherNetworks || !Array.isArray(otherNetworks)) {
      setValue("network_secondary", []);
    }
  }, [setValue]);

  // Verifica se estamos em modo de edição observando se já existem redes secundárias no formulário
  useEffect(() => {
    // Se otherNetworks já contém dados, significa que estamos em modo de edição
    // e os dados já foram carregados pelo transformPostToSchema
    if (
      otherNetworks &&
      Array.isArray(otherNetworks) &&
      otherNetworks.length > 0
    ) {
      // As redes já estão carregadas no formulário
    }
  }, [otherNetworks]);

  const handleAddOtherNetwork = () => {
    if (selectedNetwork && !otherNetworks.includes(selectedNetwork)) {
      setValue("network_secondary", [...otherNetworks, selectedNetwork]);
      setSelectedNetwork("");
    }
  };

  const handleRemoveNetwork = (networkToRemove: string) => {
    setValue(
      "network_secondary",
      otherNetworks.filter((network: string) => network !== networkToRemove),
    );
  };

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const icons = await getCoinIcons();
        setCoinIcons(icons);
      } catch (error) {
        console.error("Erro ao carregar ícones:", error);
      }
    };

    loadIcons();
  }, []);

  return (
    <div>
      <h2 className="mb-2">Redes</h2>
      <AccordionManager
        titleTrigger="Selecione as redes"
        error={errors.network_secondary?.message}
      >
        <AccordionContent className="flex gap-3 px-3 pb-3">
          <Select onValueChange={setSelectedNetwork} value={selectedNetwork}>
            <SelectTrigger className="group w-full rounded-lg border-lootlab-font-highlight text-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl">
              <SelectValue placeholder="Selecione uma rede" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              position="popper"
              align="start"
              sideOffset={4}
              avoidCollisions={false}
              className="w-full rounded-lg border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg backdrop-blur-sm"
            >
              <div className="px-1 py-1">
                {networkTypes.filter(
                  (network) => !otherNetworks.includes(network),
                ).length === 0 ? (
                  <div className="p-2 text-center text-gray-400">
                    Todas as redes já foram selecionadas
                  </div>
                ) : (
                  networkTypes
                    .filter((network) => !otherNetworks.includes(network))
                    .map((field, index) => (
                      <SelectItem
                        key={index}
                        value={field}
                        className="my-1 cursor-pointer rounded-md text-gray-200 hover:bg-blue-900/40 hover:text-blue-300 focus:bg-blue-900/40 focus:text-blue-300"
                      >
                        <div className="flex items-center gap-2">
                          {coinIcons[field] ? (
                            <img
                              src={coinIcons[field]}
                              alt={field}
                              className="h-5 w-5 rounded-full"
                            />
                          ) : (
                            <DefaultNetworkIcon />
                          )}
                          {field}
                        </div>
                      </SelectItem>
                    ))
                )}
              </div>
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddOtherNetwork}
            disabled={!selectedNetwork}
            className="border-lootlab-font-highlight bg-inherit scrollbar-thin scrollbar-track-lootlab-color-highlight hover:bg-[#111f33] hover:text-lootlab-font-base disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusIcon className="stroke-[4px] text-lootlab-font-base" />
          </Button>
        </AccordionContent>
        <div className="mx-3 mb-3 flex w-80 flex-wrap gap-2">
          {otherNetworks.map((field, index) => (
            <div key={index} className="flex items-start justify-between gap-2">
              <div className="flex h-fit w-fit items-center gap-2 rounded-full border-[1px] border-lootlab-font-highlight px-4">
                {coinIcons[field] ? (
                  <img
                    src={coinIcons[field]}
                    alt={field}
                    className="h-4 w-4 rounded-full"
                  />
                ) : (
                  <DefaultNetworkIcon />
                )}
                {field}
                <Button
                  type="button"
                  variant="default"
                  onClick={() => handleRemoveNetwork(field)}
                  className="group h-fit border-none bg-inherit p-0 py-[6px] hover:bg-none"
                >
                  <X className="stroke-[3px] text-sm text-lootlab-font-base group-hover:stroke-red-500 group-hover:stroke-[4px]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </AccordionManager>
    </div>
  );
}

export default AddOtherNetworkSelect;
