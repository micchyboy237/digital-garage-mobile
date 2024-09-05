import { observable, tap } from "@trpc/server/observable"
import type { AnyRouter } from "@trpc/server/unstable-core-do-not-import"
import type { TRPCClientError } from "../TRPCClientError"
import type { Operation, OperationResultEnvelope, TRPCLink } from "./types"

type TrpcLinkFnOptions<TRouter extends AnyRouter> = Operation &
  (
    | {
        /**
         * Request result
         */
        direction: "down"
        result: OperationResultEnvelope<unknown> | TRPCClientError<TRouter>
        elapsedMs: number
      }
    | {
        /**
         * Request was just initialized
         */
        direction: "up"
      }
  )

type TrpcLinkFn<TRouter extends AnyRouter> = (opts: TrpcLinkFnOptions<TRouter>) => void

interface TrpcLinkOptions<TRouter extends AnyRouter> {
  onQuerySuccess?: TrpcLinkFn<TRouter>
  onMutationSuccess?: TrpcLinkFn<TRouter>
  onError?: TrpcLinkFn<TRouter>
  enabled?: (opts: TrpcLinkFnOptions<TRouter>) => boolean
}

export function trpcLink<TRouter extends AnyRouter = AnyRouter>(
  opts: TrpcLinkOptions<TRouter> = {},
): TRPCLink<TRouter> {
  const { enabled = () => true, onQuerySuccess, onMutationSuccess, onError } = opts

  return () => {
    return ({ op, next }) => {
      return observable((observer) => {
        enabled({ ...op, direction: "up" }) &&
          console.log(`Request started: ${op.type} - ${op.path}`)

        const requestStartTime = Date.now()

        function handleResponse(
          result: OperationResultEnvelope<unknown> | TRPCClientError<TRouter>,
        ) {
          const elapsedMs = Date.now() - requestStartTime
          const direction: "down" = "down"

          if (result instanceof Error || "error" in result) {
            onError?.({ op, direction, result: result.data, elapsedMs })
          } else if (op.type === "query") {
            onQuerySuccess?.({ op, direction, result: result.result.data, elapsedMs })
          } else if (op.type === "mutation") {
            onMutationSuccess?.({ op, direction, result: result.result.data, elapsedMs })
          }
        }

        return next(op)
          .pipe(
            tap({
              next(result) {
                handleResponse(result)
              },
              error(result) {
                handleResponse(result)
              },
            }),
          )
          .subscribe(observer)
      })
    }
  }
}
