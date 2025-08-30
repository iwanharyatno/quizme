import { fetcherPlain } from "@/lib/fetcher";
import { useEffect } from "react";

export function usePing() {
    useEffect(() => {
        const ping = async () => {
            try {
                const result = await fetcherPlain('/ping');
                console.log(result)
            } catch (e: any) {
                console.log(e.message);
            }
        }
    })
}