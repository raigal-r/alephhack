'use client';

import { useEffect, useState } from 'react';
import { AppHero } from '../ui/ui-layout';
import { ClusterUiModal } from './cluster-ui';
import { ClusterUiTable } from './cluster-ui';
import { MiniKit, VerificationLevel, VerifyCommandInput, ResponseEvent } from '@worldcoin/minikit-js';

const verifyPayload: VerifyCommandInput = {
  action: "voting-action",
  verification_level: VerificationLevel.Device,
  signal: "0x12312",
};

export default function ClusterFeature() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && MiniKit.isInstalled()) {
      const handleVerifyAction = async (verifyResponse: any) => {
        if (verifyResponse.status === "error") {
          console.error("Error payload", verifyResponse);
          return;
        }

        try {
          const response = await fetch("/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payload: verifyResponse,
              action: verifyResponse.action
            }),
          });

          if (!response.ok) {
            throw new Error(`Error en la verificación: ${response.statusText}`);
          }

          const result = await response.json();
          console.log("Verificación exitosa", result);
        } catch (error) {
          console.error("Error al verificar en el backend:", error);
        }
      };

      MiniKit.subscribe(ResponseEvent.MiniAppVerifyAction, handleVerifyAction);

      return () => {
        MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
      };
    }
  }, []);

  
  useEffect(() => {
    setIsClient(true);

    if (MiniKit && typeof window !== 'undefined') {
      console.log('MiniKit is installed:', MiniKit.isInstalled());
    }
  }, []);

  const handleVerify = async () => {
    if (!isClient) return;

    try {
      const payload = await MiniKit.commands.verify(verifyPayload);
      console.log('Verification successful:', payload);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <AppHero
        title="Clusters"
        subtitle="Manage and select your Solana clusters"
      >
        <ClusterUiModal
          show={showModal}
          hideModal={() => setShowModal(false)}
        />
        <button
          className="btn btn-xs lg:btn-md btn-primary"
          onClick={handleVerify}
        >
          Add Cluster
        </button>
      </AppHero>
      <ClusterUiTable />
    </div>
  );
}
