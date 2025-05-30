import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Link from 'next/link'

import Panel from '~/components/Panel'
import { useSendTelemetryEvent } from '~/lib/telemetry'

const RepoCard = ({ repo, activeTab, index }: { repo: any; activeTab: number; index: number }) => {
  const sendTelemetryEvent = useSendTelemetryEvent()
  return (
    <motion.div
      key={`${activeTab}-${repo.name}`}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0 + index / 25 } }}
      exit={{ opacity: 0, y: 5, transition: { duration: 0.05 } }}
      className="h-full"
    >
      <Link
        href={repo.html_url}
        target="_blank"
        className="h-full"
        onClick={() =>
          sendTelemetryEvent({
            action: 'open_source_repo_card_clicked',
            properties: { repoName: repo.name },
          })
        }
      >
        <Panel
          outerClassName="md:h-full"
          innerClassName="relative group flex flex-col gap-2 p-4 min-h-[170px] flex-1 md:h-full"
          hasActiveOnHover
        >
          <div className="flex gap-1 items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-foreground-lighter grouopp-hover:fill-foreground"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3.33215C7.09969 3.33215 3.12744 7.31061 3.12744 12.2198C3.12744 16.1459 5.66943 19.4775 9.19538 20.6523C9.63901 20.7339 9.80049 20.4597 9.80049 20.2237C9.80049 20.0135 9.7934 19.4536 9.78896 18.7127C7.32061 19.2495 6.79979 17.5211 6.79979 17.5211C6.39698 16.4937 5.81494 16.2204 5.81494 16.2204C5.00931 15.6703 5.87616 15.681 5.87616 15.681C6.76608 15.7431 7.23455 16.5966 7.23455 16.5966C8.02598 17.9541 9.31161 17.562 9.81646 17.3348C9.89809 16.7608 10.127 16.3695 10.3808 16.1477C8.41105 15.9232 6.33931 15.1602 6.33931 11.7549C6.33931 10.7851 6.68534 9.99101 7.25229 9.36993C7.16091 9.14545 6.85658 8.24134 7.33925 7.0187C7.33925 7.0187 8.08454 6.77914 9.7792 7.92903C10.503 7.73162 11.2498 7.63108 12 7.63002C12.7542 7.63357 13.5128 7.73206 14.2217 7.92903C15.9155 6.77914 16.659 7.01781 16.659 7.01781C17.1434 8.24134 16.8382 9.14545 16.7477 9.36993C17.3155 9.99101 17.6598 10.7851 17.6598 11.7549C17.6598 15.169 15.5845 15.9205 13.6086 16.1406C13.9271 16.4147 14.2102 16.9569 14.2102 17.7864C14.2102 18.9736 14.1995 19.9327 14.1995 20.2237C14.1995 20.4615 14.3592 20.7383 14.8099 20.6514C16.5767 20.0588 18.1126 18.9259 19.2005 17.4129C20.2884 15.8999 20.8733 14.0833 20.8726 12.2198C20.8726 7.31061 16.8994 3.33215 12 3.33215Z"
                fill="currentColor"
              />
            </svg>

            <p className="text-foreground group-hover:text-brand text-lg m-0 leading-none">
              {repo.name}
            </p>
          </div>
          <p className="text-sm flex-1 text-foreground-lighter">{repo.description}</p>
          <div className="text-sm w-full flex justify-between text-foreground-lighter mt-4">
            <p>{repo.full_name}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span>{repo.forks.toLocaleString()}</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 fill-foreground-lighter stroke-none"
                >
                  <path
                    d="M5 5.37201V6.25001C5 6.66401 5.336 7.00001 5.75 7.00001H10.25C10.4489 7.00001 10.6397 6.92099 10.7803 6.78034C10.921 6.63969 11 6.44892 11 6.25001V5.37201C10.4996 5.19509 10.0778 4.84696 9.80928 4.38915C9.54072 3.93134 9.44265 3.39333 9.53241 2.87021C9.62216 2.34709 9.89396 1.87253 10.2998 1.53043C10.7056 1.18832 11.2192 1.00069 11.75 1.00069C12.2808 1.00069 12.7944 1.18832 13.2002 1.53043C13.6061 1.87253 13.8778 2.34709 13.9676 2.87021C14.0574 3.39333 13.9593 3.93134 13.6907 4.38915C13.4222 4.84696 13.0004 5.19509 12.5 5.37201V6.25001C12.5 6.84674 12.263 7.41904 11.841 7.841C11.419 8.26295 10.8467 8.50001 10.25 8.50001H8.75V10.628C9.25069 10.8049 9.67271 11.1532 9.94146 11.6112C10.2102 12.0692 10.3084 12.6075 10.2186 13.1309C10.1289 13.6543 9.85695 14.1291 9.45096 14.4714C9.04497 14.8136 8.53104 15.0014 8 15.0014C7.46897 15.0014 6.95504 14.8136 6.54905 14.4714C6.14306 14.1291 5.87115 13.6543 5.78139 13.1309C5.69164 12.6075 5.78981 12.0692 6.05855 11.6112C6.3273 11.1532 6.74932 10.8049 7.25 10.628V8.50001H5.75C5.15327 8.50001 4.58097 8.26295 4.15901 7.841C3.73706 7.41904 3.5 6.84674 3.5 6.25001V5.37201C2.99959 5.19509 2.57784 4.84696 2.30928 4.38915C2.04072 3.93134 1.94265 3.39333 2.03241 2.87021C2.12216 2.34709 2.39396 1.87253 2.79976 1.53043C3.20556 1.18832 3.71924 1.00069 4.25 1.00069C4.78077 1.00069 5.29445 1.18832 5.70025 1.53043C6.10605 1.87253 6.37785 2.34709 6.4676 2.87021C6.55735 3.39333 6.45929 3.93134 6.19073 4.38915C5.92217 4.84696 5.50042 5.19509 5 5.37201ZM5 3.25001C5 3.05109 4.92099 2.86033 4.78033 2.71968C4.63968 2.57902 4.44892 2.50001 4.25 2.50001C4.05109 2.50001 3.86033 2.57902 3.71967 2.71968C3.57902 2.86033 3.5 3.05109 3.5 3.25001C3.5 3.44892 3.57902 3.63969 3.71967 3.78034C3.86033 3.92099 4.05109 4.00001 4.25 4.00001C4.44892 4.00001 4.63968 3.92099 4.78033 3.78034C4.92099 3.63969 5 3.44892 5 3.25001ZM11.75 4.00001C11.9489 4.00001 12.1397 3.92099 12.2803 3.78034C12.421 3.63969 12.5 3.44892 12.5 3.25001C12.5 3.05109 12.421 2.86033 12.2803 2.71968C12.1397 2.57902 11.9489 2.50001 11.75 2.50001C11.5511 2.50001 11.3603 2.57902 11.2197 2.71968C11.079 2.86033 11 3.05109 11 3.25001C11 3.44892 11.079 3.63969 11.2197 3.78034C11.3603 3.92099 11.5511 4.00001 11.75 4.00001ZM8.75 12.75C8.75 12.5511 8.67099 12.3603 8.53033 12.2197C8.38968 12.079 8.19892 12 8 12C7.80109 12 7.61033 12.079 7.46967 12.2197C7.32902 12.3603 7.25 12.5511 7.25 12.75C7.25 12.9489 7.32902 13.1397 7.46967 13.2803C7.61033 13.421 7.80109 13.5 8 13.5C8.19892 13.5 8.38968 13.421 8.53033 13.2803C8.67099 13.1397 8.75 12.9489 8.75 12.75Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-1">
                <span>{repo.stargazers_count.toLocaleString()}</span>
                <Star className="w-4 fill-foreground-lighter stroke-none" />
              </div>
            </div>
          </div>
        </Panel>
      </Link>
    </motion.div>
  )
}

export default RepoCard
