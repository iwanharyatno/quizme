import { fetcherPlain } from "@/lib/fetcher";
import { useEffect } from "react";

export function usePing() {
    useEffect(() => {
        const ping = async () => {
            try {
                const result = await fetcherPlain('/ping');
                console.log(result)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Terjadi error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        }
        ping();
    })
}