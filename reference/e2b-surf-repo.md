Directory structure:
└── e2b-dev-surf/
    ├── README.md
    ├── components.json
    ├── LICENSE
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── .env.example
    ├── .eslintrc.json
    ├── app/
    │   ├── actions.ts
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── api/
    │       └── chat/
    │           └── route.ts
    ├── assets/
    ├── components/
    │   ├── frame.tsx
    │   ├── icons.tsx
    │   ├── loader.tsx
    │   ├── logo.tsx
    │   ├── markdown.tsx
    │   ├── providers.tsx
    │   ├── repo-banner.tsx
    │   ├── scanline.tsx
    │   ├── surfing.tsx
    │   ├── use-scroll-to-bottom.ts
    │   ├── chat/
    │   │   ├── example-prompts.tsx
    │   │   ├── input.tsx
    │   │   ├── loader.tsx
    │   │   ├── message-list.tsx
    │   │   └── message.tsx
    │   └── ui/
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── cctv.tsx
    │       ├── cursor-click.tsx
    │       ├── grid-pattern.tsx
    │       ├── input.tsx
    │       ├── keyboard.tsx
    │       ├── route.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── shared-menu-styles.ts
    │       └── skeleton.tsx
    ├── lib/
    │   ├── chat-context.tsx
    │   ├── config.ts
    │   ├── logger.ts
    │   ├── utils.ts
    │   └── streaming/
    │       ├── anthropic.ts
    │       ├── index.ts
    │       ├── openai.ts
    │       ├── resolution.test.ts
    │       └── resolution.ts
    ├── public/
    ├── readme-assets/
    ├── styles/
    │   ├── globals.css
    │   ├── theme.css
    │   └── variables.css
    └── types/
        ├── anthropic.ts
        ├── api.ts
        └── chat.ts


================================================
FILE: README.md
================================================
![E2B Surf Preview Light](/readme-assets/surf-light.png#gh-light-mode-only)
![E2B Surf Preview Dark](/readme-assets/surf-dark.png#gh-dark-mode-only)

# 🏄 Surf - OpenAI's Computer Use Agent + E2B Desktop

A Next.js application that allows AI to interact with a virtual desktop environment. This project integrates [E2B's desktop sandbox](https://github.com/e2b-dev/desktop) with OpenAI's API to create an AI agent that can perform tasks on a virtual computer through natural language instructions.

[E2B](https://e2b.dev) is an open source isolated virtual computer in the cloud made for AI use cases.

## Overview

The Computer Use App provides a web interface where users can:

1. Start a virtual desktop sandbox environment
2. Send natural language instructions to an AI agent
3. Watch as the AI agent performs actions on the virtual desktop
4. Interact with the AI through a chat interface

The application uses Server-Sent Events (SSE) to stream AI responses and actions in real-time, providing a seamless experience.

## How It Works

### Architecture

The application consists of several key components:

1. **Frontend UI (Next.js)**: Provides the user interface with a virtual desktop view and chat interface
2. [**E2B Desktop Sandbox**](https://github.com/e2b-dev/desktop): Creates and manages virtual desktop environments
3. [**OpenAI Computer Use**](https://platform.openai.com/docs/guides/tools-computer-use): Processes user instructions and generates actions for the AI agent
4. **Streaming API**: Handles real-time communication between the frontend and backend

### Core Flow

1. User starts a new sandbox instance
2. E2B creates a virtual desktop and provides a URL for streaming
3. User sends instructions via the chat interface
4. Backend processes the instructions using OpenAI's API
5. AI generates actions (clicks, typing, etc.) to perform on the virtual desktop
6. Actions are executed on the sandbox and streamed back to the frontend
7. The process repeats as the user continues to provide instructions

## Prerequisites

Before starting, you'll need:

1. [Node.js](https://nodejs.org/) (version specified in package.json)
2. [npm](https://www.npmjs.com/) (comes with Node.js)
3. An [E2B API key](https://e2b.dev/docs/getting-started/api-key)
4. An [OpenAI API key](https://platform.openai.com/api-keys)

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/e2b-dev/surf
cd surf
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory based on the provided `.env.example`:

```env
E2B_API_KEY=your_e2b_api_key
OPENAI_API_KEY=your_openai_api_key
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open the application**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Start a Sandbox Instance**
   - Click the "Start new Sandbox" button to initialize a virtual desktop environment
   - Wait for the sandbox to start (this may take a few seconds)

2. **Send Instructions**
   - Type your instructions in the chat input (e.g., "Open Firefox and go to google.com")
   - Press Enter or click the send button
   - You can also select from example prompts if available

3. **Watch AI Actions**
   - The AI will process your instructions and perform actions on the virtual desktop
   - You can see the AI's reasoning and actions in the chat interface
   - The virtual desktop will update in real-time as actions are performed

4. **Manage the Sandbox**
   - The timer shows the remaining time for your sandbox instance
   - You can stop the sandbox at any time by clicking the "Stop" button
   - The sandbox will automatically extend its time when it's about to expire

## Features

- **Virtual Desktop Environment**: Runs a Linux-based desktop in a sandbox
- **AI-Powered Interaction**: Uses OpenAI's API to understand and execute user instructions
- **Real-Time Streaming**: Shows AI actions and responses as they happen
- **Chat Interface**: Provides a conversational interface for interacting with the AI
- **Example Prompts**: Offers pre-defined instructions to help users get started
- **Dark/Light Mode**: Supports both dark and light themes

## Technical Details

### Dependencies

The application uses several key dependencies:

- **Next.js**: React framework for the frontend
- **@e2b/desktop**: SDK for creating and managing desktop sandbox environments
- **OpenAI**: SDK for interacting with OpenAI's API
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Library for animations

See `package.json` for a complete list of dependencies.

### API Endpoints

- **/api/chat**: Handles chat messages and streams AI responses and actions

### Server Actions

- **createSandbox**: Creates a new sandbox instance
- **increaseTimeout**: Extends the sandbox timeout
- **stopSandboxAction**: Stops a running sandbox instance

## Troubleshooting

- **Sandbox not starting**: Verify your E2B API key is correct in `.env.local`
- **AI not responding**: Check that your OpenAI API key is valid and has access to the required models
- **Actions not working**: Ensure the sandbox is running and the AI has proper instructions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
- Check the [E2B Documentation](https://e2b.dev/docs)
- Join the [E2B Discord](https://discord.gg/U7KEcGErtQ)
- Open an [issue](https://github.com/e2b-dev/computer-use-app/issues)



================================================
FILE: components.json
================================================
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}


================================================
FILE: LICENSE
================================================
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2025 FoundryLabs, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


================================================
FILE: next.config.mjs
================================================
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;



================================================
FILE: package.json
================================================
{
  "name": "surf",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@ai-sdk/anthropic": "1.1.0",
    "@ai-sdk/google": "1.1.10",
    "@ai-sdk/groq": "1.1.9",
    "@ai-sdk/mistral": "1.1.11",
    "@ai-sdk/openai": "1.0.10",
    "@ai-sdk/ui-utils": "1.1.10",
    "@ai-sdk/xai": "1.1.10",
    "@anthropic-ai/sdk": "^0.39.0",
    "@e2b/desktop": "^1.6.2",
    "@gradio/client": "^1.10.0",
    "@phosphor-icons/react": "^2.1.7",
    "@radix-ui/react-icons": "^1.3.2",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.5",
    "@radix-ui/react-separator": "^1.1.2",
    "@vercel/analytics": "^1.5.0",
    "@vercel/kv": "^3.0.0",
    "ai": "4.1.25",
    "ansis": "^3.17.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "e2b": "^1.0.7",
    "hls.js": "^1.5.19",
    "lucide-react": "^0.474.0",
    "motion": "^12.5.0",
    "next": "^15.2.3",
    "next-themes": "^0.4.4",
    "openai": "4.87.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-markdown": "^9.0.1",
    "react-use": "^17.6.0",
    "remark-gfm": "^4.0.0",
    "sharp": "^0.33.3",
    "sonner": "^1.7.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.13",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "eslint": "^9.17.0",
    "eslint-config-next": "15.1.2",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.0.13",
    "typescript": "^5.7.2"
  }
}



================================================
FILE: postcss.config.mjs
================================================
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}



================================================
FILE: .env.example
================================================
E2B_API_KEY=your_e2b_api_key
OPENAI_API_KEY=your_openai_api_key


================================================
FILE: .eslintrc.json
================================================
{
  "extends": "next/core-web-vitals"
}



================================================
FILE: app/actions.ts
================================================
"use server";

import { SANDBOX_TIMEOUT_MS } from "@/lib/config";
import { Sandbox } from "@e2b/desktop";

export async function increaseTimeout(sandboxId: string) {
  try {
    const desktop = await Sandbox.connect(sandboxId);
    await desktop.setTimeout(SANDBOX_TIMEOUT_MS); // 5 minutes
    return true;
  } catch (error) {
    console.error("Failed to increase timeout:", error);
    return false;
  }
}

export async function stopSandboxAction(sandboxId: string) {
  try {
    const desktop = await Sandbox.connect(sandboxId);
    await desktop.kill();
    return true;
  } catch (error) {
    console.error("Failed to stop sandbox:", error);
    return false;
  }
}



================================================
FILE: app/layout.tsx
================================================
import "@/styles/globals.css";

import { Metadata } from "next";
import { Toaster } from "sonner";
import { Providers } from "../components/providers";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ChatProvider } from "@/lib/chat-context";
import { Analytics } from "@vercel/analytics/react";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Surf - E2B Computer Use Agent",
  description:
    "AI agent that interacts with a virtual desktop environment through natural language instructions",
  keywords: [
    "AI",
    "desktop",
    "automation",
    "E2B",
    "OpenAI",
    "virtual desktop",
    "sandbox",
  ],
  authors: [{ name: "E2B", url: "https://e2b.dev" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
        suppressHydrationWarning
      >
        <Providers>
          <ChatProvider>
            <Toaster position="top-center" richColors />
            {children}
            <Analytics />
          </ChatProvider>
        </Providers>
      </body>
    </html>
  );
}



================================================
FILE: app/page.tsx
================================================
"use client";

import { useRef, useState, useEffect } from "react";
import {
  MoonIcon,
  SunIcon,
  Timer,
  Power,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { increaseTimeout, stopSandboxAction } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { ChatList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/input";
import { ExamplePrompts } from "@/components/chat/example-prompts";
import { useChat } from "@/lib/chat-context";
import Frame from "@/components/frame";
import { Button } from "@/components/ui/button";
import { Loader, AssemblyLoader } from "@/components/loader";
import Link from "next/link";
import Logo from "@/components/logo";
import { RepoBanner } from "@/components/repo-banner";
import { SANDBOX_TIMEOUT_MS } from "@/lib/config";
import { Surfing } from "@/components/surfing";

export default function Home() {
  const [sandboxId, setSandboxId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vncUrl, setVncUrl] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [timeRemaining, setTimeRemaining] = useState<number>(
    SANDBOX_TIMEOUT_MS / 1000
  );
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iFrameWrapperRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    messages,
    isLoading: chatLoading,
    input,
    setInput,
    sendMessage,
    stopGeneration,
    clearMessages,
    handleSubmit,
    onSandboxCreated,
  } = useChat();

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    setIsTabVisible(document.visibilityState === "visible");

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const stopSandbox = async () => {
    if (sandboxId) {
      try {
        stopGeneration();
        const success = await stopSandboxAction(sandboxId);
        if (success) {
          setSandboxId(null);
          setVncUrl(null);
          clearMessages();
          setTimeRemaining(SANDBOX_TIMEOUT_MS / 1000);
          toast("Sandbox instance stopped");
        } else {
          toast.error("Failed to stop sandbox instance");
        }
      } catch (error) {
        console.error("Failed to stop sandbox:", error);
        toast.error("Failed to stop sandbox");
      }
    }
  };

  const handleIncreaseTimeout = async () => {
    if (!sandboxId) return;

    try {
      await increaseTimeout(sandboxId);
      setTimeRemaining(SANDBOX_TIMEOUT_MS / 1000);
      toast.success("Instance time increased");
    } catch (error) {
      console.error("Failed to increase time:", error);
      toast.error("Failed to increase time");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    const content = handleSubmit(e);
    if (content) {
      const width =
        iFrameWrapperRef.current?.clientWidth ||
        (window.innerWidth < 768 ? window.innerWidth - 32 : 1024);
      const height =
        iFrameWrapperRef.current?.clientHeight ||
        (window.innerWidth < 768
          ? Math.min(window.innerHeight * 0.4, 400)
          : 768);

      sendMessage({
        content,
        sandboxId: sandboxId || undefined,
        environment: "linux",
        resolution: [width, height],
      });
    }
  };

  const handleExampleClick = (prompt: string) => {
    const width =
      iFrameWrapperRef.current?.clientWidth ||
      (window.innerWidth < 768 ? window.innerWidth - 32 : 1024);
    const height =
      iFrameWrapperRef.current?.clientHeight ||
      (window.innerWidth < 768 ? Math.min(window.innerHeight * 0.4, 400) : 768);

    sendMessage({
      content: prompt,
      sandboxId: sandboxId || undefined,
      environment: "linux",
      resolution: [width, height],
    });
  };

  const handleSandboxCreated = (newSandboxId: string, newVncUrl: string) => {
    setSandboxId(newSandboxId);
    setVncUrl(newVncUrl);
    setTimeRemaining(SANDBOX_TIMEOUT_MS / 1000);
    toast.success("Sandbox instance created");
  };

  const handleClearChat = () => {
    clearMessages();
    toast.success("Chat cleared");
  };

  const ThemeToggle = () => (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
      size="icon"
      suppressHydrationWarning
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" suppressHydrationWarning />
      ) : (
        <MoonIcon className="h-5 w-5" suppressHydrationWarning />
      )}
    </Button>
  );

  useEffect(() => {
    if (!sandboxId) return;
    const interval = setInterval(() => {
      if (isTabVisible) {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sandboxId, isTabVisible]);

  useEffect(() => {
    if (!sandboxId) return;

    if (timeRemaining === 10 && isTabVisible) {
      handleIncreaseTimeout();
    }

    if (timeRemaining === 0) {
      setSandboxId(null);
      setVncUrl(null);
      clearMessages();
      stopGeneration();
      toast.error("Instance time expired");
      setTimeRemaining(SANDBOX_TIMEOUT_MS / 1000);
    }
  }, [timeRemaining, sandboxId, stopGeneration, clearMessages, isTabVisible]);

  useEffect(() => {
    onSandboxCreated((newSandboxId: string, newVncUrl: string) => {
      handleSandboxCreated(newSandboxId, newVncUrl);
    });
  }, [onSandboxCreated]);

  return (
    <div className="w-full h-dvh overflow-hidden p-2 sm:p-4 md:p-8 md:pb-10">
      <Frame
        classNames={{
          wrapper: "w-full h-full",
          frame: "flex flex-col h-full overflow-hidden",
        }}
      >
        <div className="border-b w-full px-2 sm:px-3 py-2 flex items-center justify-between h-auto">
          <div className="flex flex-1 items-center text-base sm:text-lg truncate">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2"
              target="_blank"
            >
              <Logo width={20} height={20} className="sm:w-6 sm:h-6" />
              <h1 className="whitespace-pre">Surf - Computer Agent by </h1>
            </Link>
            <Link
              href="https://e2b.dev"
              className="underline decoration-accent decoration-1 underline-offset-2 text-accent"
              target="_blank"
            >
              E2B
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="mr-1"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <RepoBanner />

            <AnimatePresence>
              {sandboxId && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={handleIncreaseTimeout}
                    variant="muted"
                    title={
                      isTabVisible
                        ? "Increase Time"
                        : "Timer paused (tab not active)"
                    }
                  >
                    <Timer
                      className={`h-3 w-3 ${
                        !isTabVisible ? "text-fg-400" : ""
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        !isTabVisible ? "text-fg-400" : ""
                      }`}
                    >
                      {Math.floor(timeRemaining / 60)}:
                      {(timeRemaining % 60).toString().padStart(2, "0")}
                      {!isTabVisible && " (paused)"}
                    </span>
                  </Button>

                  <Button
                    onClick={stopSandbox}
                    variant="error"
                    className="text-xs"
                  >
                    <Power className="w-3 h-3" />
                    Stop
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="md:hidden flex items-center">
            <AnimatePresence>
              {sandboxId && (
                <motion.div
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={handleIncreaseTimeout}
                    variant="muted"
                    size="sm"
                    title={
                      isTabVisible
                        ? "Increase Time"
                        : "Timer paused (tab not active)"
                    }
                    className="px-1.5"
                  >
                    <Timer
                      className={`h-3 w-3 ${
                        !isTabVisible ? "text-fg-400" : ""
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ml-1 ${
                        !isTabVisible ? "text-fg-400" : ""
                      }`}
                    >
                      {Math.floor(timeRemaining / 60)}:
                      {(timeRemaining % 60).toString().padStart(2, "0")}
                    </span>
                  </Button>

                  <Button
                    onClick={stopSandbox}
                    variant="error"
                    size="sm"
                    className="text-xs px-1.5"
                  >
                    <Power className="w-3 h-3" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-b p-2 flex items-center justify-between"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <RepoBanner />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <div
            ref={iFrameWrapperRef}
            className="relative w-full md:flex-1 h-[40vh] md:h-auto overflow-hidden"
          >
            {isLoading || (chatLoading && !sandboxId) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-light text-accent">
                    {isLoading ? "Starting instance" : "Creating sandbox..."}
                  </h2>
                  <Loader variant="square" className="text-accent" />
                </div>

                <AssemblyLoader
                  className="mt-4 text-fg-300"
                  gridWidth={8}
                  gridHeight={4}
                  filledChar="■"
                  emptyChar="□"
                />

                <p className="text-sm text-fg-500 mt-4">
                  {isLoading
                    ? "Preparing your sandbox environment..."
                    : "Creating a new sandbox for your request..."}
                </p>
              </div>
            ) : sandboxId && vncUrl ? (
              <iframe
                ref={iframeRef}
                src={vncUrl}
                className="w-full h-full"
                allow="clipboard-read; clipboard-write"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Surfing className="text-[7px] leading-[7px] text-accent font-bold" />
                <h1 className="text-center text-fg-300 max-w-xs">
                  <span className="text-fg">Type</span> a message or{" "}
                  <span className="text-fg">select</span> an example prompt to
                  start a new{" "}
                  <a
                    href="https://github.com/e2b-dev/desktop"
                    className="underline inline-flex items-center gap-1 decoration-accent decoration-1 underline-offset-2 text-accent"
                    target="_blank"
                  >
                    sandbox <ArrowUpRight className="size-4" />
                  </a>
                </h1>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col relative border-t md:border-t-0 md:border-l overflow-hidden h-[60vh] md:h-auto md:max-w-xl">
            <ChatList className="flex-1" messages={messages} />

            {messages.length === 0 && (
              <ExamplePrompts
                onPromptClick={handleExampleClick}
                disabled={false}
                className="-translate-y-16"
              />
            )}

            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={onSubmit}
              isLoading={chatLoading}
              onStop={stopGeneration}
              disabled={false}
              className="absolute bottom-3 left-3 right-3"
            />
          </div>
        </div>
      </Frame>
    </div>
  );
}



================================================
FILE: app/api/chat/route.ts
================================================
import { Sandbox } from "@e2b/desktop";
import { ComputerModel, SSEEvent, SSEEventType } from "@/types/api";
import {
  ComputerInteractionStreamerFacade,
  createStreamingResponse,
} from "@/lib/streaming";
import { SANDBOX_TIMEOUT_MS } from "@/lib/config";
import { OpenAIComputerStreamer } from "@/lib/streaming/openai";
import { logError } from "@/lib/logger";
import { ResolutionScaler } from "@/lib/streaming/resolution";

export const maxDuration = 800;

class StreamerFactory {
  static getStreamer(
    model: ComputerModel,
    desktop: Sandbox,
    resolution: [number, number]
  ): ComputerInteractionStreamerFacade {
    const resolutionScaler = new ResolutionScaler(desktop, resolution);

    switch (model) {
      case "anthropic":
      // currently not implemented
      /* return new AnthropicComputerStreamer(desktop, resolutionScaler); */
      case "openai":
      default:
        return new OpenAIComputerStreamer(desktop, resolutionScaler);
    }
  }
}

export async function POST(request: Request) {
  const abortController = new AbortController();
  const { signal } = abortController;

  request.signal.addEventListener("abort", () => {
    abortController.abort();
  });

  const {
    messages,
    sandboxId,
    resolution,
    model = "openai",
  } = await request.json();

  const apiKey = process.env.E2B_API_KEY;

  if (!apiKey) {
    return new Response("E2B API key not found", { status: 500 });
  }

  let desktop: Sandbox | undefined;
  let activeSandboxId = sandboxId;
  let vncUrl: string | undefined;

  try {
    if (!activeSandboxId) {
      const newSandbox = await Sandbox.create({
        resolution,
        dpi: 96,
        timeoutMs: SANDBOX_TIMEOUT_MS,
      });

      await newSandbox.stream.start();

      activeSandboxId = newSandbox.sandboxId;
      vncUrl = newSandbox.stream.getUrl();
      desktop = newSandbox;
    } else {
      desktop = await Sandbox.connect(activeSandboxId);
    }

    if (!desktop) {
      return new Response("Failed to connect to sandbox", { status: 500 });
    }

    desktop.setTimeout(SANDBOX_TIMEOUT_MS);

    try {
      const streamer = StreamerFactory.getStreamer(
        model as ComputerModel,
        desktop,
        resolution
      );

      if (!sandboxId && activeSandboxId && vncUrl) {
        async function* stream(): AsyncGenerator<SSEEvent<typeof model>> {
          yield {
            type: SSEEventType.SANDBOX_CREATED,
            sandboxId: activeSandboxId,
            vncUrl: vncUrl as string,
          };

          yield* streamer.stream({ messages, signal });
        }

        return createStreamingResponse(stream());
      } else {
        return createStreamingResponse(streamer.stream({ messages, signal }));
      }
    } catch (error) {
      logError("Error from streaming service:", error);

      return new Response(
        "An error occurred with the AI service. Please try again.",
        { status: 500 }
      );
    }
  } catch (error) {
    logError("Error connecting to sandbox:", error);
    return new Response("Failed to connect to sandbox", { status: 500 });
  }
}




================================================
FILE: components/frame.tsx
================================================
import { cn } from "@/lib/utils";
import Scanline from "@/components/scanline";

interface FrameProps {
  children: React.ReactNode;
  classNames?: {
    wrapper?: string;
    frame?: string;
  };
}

export default function Frame({ children, classNames }: FrameProps) {
  return (
    <div
      className={cn("relative flex h-fit w-fit pb-4.5", classNames?.wrapper)}
    >
      <div className="absolute inset-x-[16px] top-1 bottom-0 h-auto w-auto rounded-xs border">
        <Scanline />
      </div>
      <div
        className={cn(
          "bg-bg relative w-full rounded-xs border shadow-md",
          classNames?.frame
        )}
      >
        {children}
      </div>
    </div>
  );
}



================================================
FILE: components/icons.tsx
================================================
import { cn } from "@/lib/utils";

export const BotIcon = () => {
  return (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 2.79933C9.19835 2.53997 9.5 2.05521 9.5 1.5C9.5 0.671573 8.82843 0 8 0C7.17157 0 6.5 0.671573 6.5 1.5C6.5 2.05521 6.80165 2.53997 7.25 2.79933V5H7C4.027 5 1.55904 7.16229 1.08296 10H0V13H1V14.5V16H2.5H13.5H15V14.5V13H16V10H14.917C14.441 7.16229 11.973 5 9 5H8.75V2.79933ZM7 6.5C4.51472 6.5 2.5 8.51472 2.5 11V14.5H13.5V11C13.5 8.51472 11.4853 6.5 9 6.5H7ZM7.25 11.25C7.25 12.2165 6.4665 13 5.5 13C4.5335 13 3.75 12.2165 3.75 11.25C3.75 10.2835 4.5335 9.5 5.5 9.5C6.4665 9.5 7.25 10.2835 7.25 11.25ZM10.5 13C11.4665 13 12.25 12.2165 12.25 11.25C12.25 10.2835 11.4665 9.5 10.5 9.5C9.5335 9.5 8.75 10.2835 8.75 11.25C8.75 12.2165 9.5335 13 10.5 13Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const UserIcon = () => {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const AttachmentIcon = () => {
  return (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 6.5V13.5C14.5 14.8807 13.3807 16 12 16H4C2.61929 16 1.5 14.8807 1.5 13.5V1.5V0H3H8H9.08579C9.351 0 9.60536 0.105357 9.79289 0.292893L14.2071 4.70711C14.3946 4.89464 14.5 5.149 14.5 5.41421V6.5ZM13 6.5V13.5C13 14.0523 12.5523 14.5 12 14.5H4C3.44772 14.5 3 14.0523 3 13.5V1.5H8V5V6.5H9.5H13ZM9.5 2.12132V5H12.3787L9.5 2.12132Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const VercelIcon = ({ size = 17 }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1L16 15H0L8 1Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const MasonryIcon = () => {
  return (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 6.5V2.5H5.5V6.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V7C7 7.55228 6.55228 8 6 8H2C1.44772 8 1 7.55228 1 7V2ZM2.5 13.5V11.5H5.5V13.5H2.5ZM1 11C1 10.4477 1.44772 10 2 10H6C6.55228 10 7 10.4477 7 11V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V11ZM10.5 2.5V4.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V5C9 5.55228 9.44772 6 10 6H14C14.5523 6 15 5.55228 15 5V2C15 1.44772 14.5523 1 14 1H10ZM13.5 13.5H10.5V9.5H13.5V13.5ZM9 9C9 8.44772 9.44772 8 10 8H14C14.5523 8 15 8.44772 15 9V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V9Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

interface IconProps {
  className?: string;
}

export const GitHubIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
    fill="currentColor"
    className={cn("w-4 h-4", className)}
  >
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
  </svg>
);

export const BoxIcon = ({ size = 16 }: { size: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0.154663L8.34601 0.334591L14.596 3.58459L15 3.79466V4.25V11.75V12.2053L14.596 12.4154L8.34601 15.6654L8 15.8453L7.65399 15.6654L1.40399 12.4154L1 12.2053V11.75V4.25V3.79466L1.40399 3.58459L7.65399 0.334591L8 0.154663ZM2.5 11.2947V5.44058L7.25 7.81559V13.7647L2.5 11.2947ZM8.75 13.7647L13.5 11.2947V5.44056L8.75 7.81556V13.7647ZM8 1.84534L12.5766 4.22519L7.99998 6.51352L3.42335 4.2252L8 1.84534Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const HomeIcon = ({ size = 16 }: { size: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 6.56062L8.00001 2.06062L3.50001 6.56062V13.5L6.00001 13.5V11C6.00001 9.89539 6.89544 8.99996 8.00001 8.99996C9.10458 8.99996 10 9.89539 10 11V13.5L12.5 13.5V6.56062ZM13.78 5.71933L8.70711 0.646409C8.31659 0.255886 7.68342 0.255883 7.2929 0.646409L2.21987 5.71944C2.21974 5.71957 2.21961 5.7197 2.21949 5.71982L0.469676 7.46963L-0.0606537 7.99996L1.00001 9.06062L1.53034 8.53029L2.00001 8.06062V14.25V15H2.75001L6.00001 15H7.50001H8.50001H10L13.25 15H14V14.25V8.06062L14.4697 8.53029L15 9.06062L16.0607 7.99996L15.5303 7.46963L13.7806 5.71993C13.7804 5.71973 13.7802 5.71953 13.78 5.71933ZM8.50001 11V13.5H7.50001V11C7.50001 10.7238 7.72386 10.5 8.00001 10.5C8.27615 10.5 8.50001 10.7238 8.50001 11Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const GPSIcon = ({ size = 16 }: { size: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: "currentcolor" }}
    >
      <path
        d="M1 6L15 1L10 15L7.65955 8.91482C7.55797 8.65073 7.34927 8.44203 7.08518 8.34045L1 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        fill="transparent"
      ></path>
    </svg>
  );
};

export const InvoiceIcon = ({ size = 16 }: { size: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 15.1L12 14.5L10.1524 15.8857C10.0621 15.9534 9.93791 15.9534 9.8476 15.8857L8 14.5L6.14377 15.8922C6.05761 15.9568 5.94008 15.9601 5.85047 15.9003L3.75 14.5L3 15L2.83257 15.1116L1.83633 15.7758L1.68656 15.8756C1.60682 15.9288 1.5 15.8716 1.5 15.7758V15.5958V14.3985V14.1972V1.5V0H3H8H9.08579C9.351 0 9.60536 0.105357 9.79289 0.292893L14.2071 4.70711C14.3946 4.89464 14.5 5.149 14.5 5.41421V6.5V14.2507V14.411V15.5881V15.7881C14.5 15.8813 14.3982 15.9389 14.3183 15.891L14.1468 15.7881L13.1375 15.1825L13 15.1ZM12.3787 5L9.5 2.12132V5H12.3787ZM8 1.5V5V6.5H9.5H13V13.3507L12.7717 13.2138L11.9069 12.6948L11.1 13.3L10 14.125L8.9 13.3L8 12.625L7.1 13.3L5.94902 14.1632L4.58205 13.2519L3.75 12.6972L3 13.1972V1.5H8Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const AnthropicLogo = ({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 92.2 65"
      className={className}
    >
      <style>{`.st0{fill:currentColor;}`}</style>
      <path
        className="st0"
        d="M66.5,0H52.4l25.7,65h14.1L66.5,0z M25.7,0L0,65h14.4l5.3-13.6h26.9L51.8,65h14.4L40.5,0C40.5,0,25.7,0,25.7,0z
        M24.3,39.3l8.8-22.8l8.8,22.8H24.3z"
      />
    </svg>
  );
};



================================================
FILE: components/loader.tsx
================================================
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Add this before the Button component
const LOADER_VARIANTS = {
  line: ["|", "/", "─", "\\"],
  progress: ["▰▱▱▱▱▱", "▰▰▱▱▱▱", "▰▰▰▱▱▱", "▰▰▰▰▱▱", "▰▰▰▰▰▱", "▰▰▰▰▰▰"],
  compute: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  dots: [".  ", ".. ", "...", " ..", "  .", "   "],
  clock: [
    "🕐",
    "🕑",
    "🕒",
    "🕓",
    "🕔",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
    "🕛",
  ],
  bounce: ["⠁", "⠂", "⠄", "⠂"],
  wave: ["⠀", "⠄", "⠆", "⠇", "⠋", "⠙", "⠸", "⠰", "⠠", "⠀"],
  square: ["◰", "◳", "◲", "◱"],
  pulse: ["□", "◊", "○", "◊"],
} as const;

export const Loader = ({
  variant = "square",
  interval = 150,
  className,
}: {
  variant?: keyof typeof LOADER_VARIANTS;
  interval?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const chars = LOADER_VARIANTS[variant];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % chars.length);
    }, interval);
    return () => clearInterval(timer);
  }, [chars, interval]);

  return <span className={cn("font-mono", className)}>{chars[index]}</span>;
};

export const AssemblyLoader = ({
  interval = 20,
  className,
  filledChar = "█",
  emptyChar = "░",
  gridWidth = 5,
  gridHeight = 3,
}: {
  interval?: number;
  className?: string;
  filledChar?: string;
  emptyChar?: string;
  gridWidth?: number;
  gridHeight?: number;
}) => {
  // Grid state: true means filled
  const [grid, setGrid] = useState<boolean[][]>(
    Array(gridHeight)
      .fill(null)
      .map(() => Array(gridWidth).fill(false))
  );

  // Current falling block position
  const [block, setBlock] = useState<{ x: number; y: number } | null>(null);

  // Check if block can move down
  const canMoveDown = (x: number, y: number) => {
    if (y + 1 >= gridHeight) return false; // Bottom boundary
    if (grid[y + 1][x]) return false; // Block below
    return true;
  };

  // Check if block can move left
  const canMoveLeft = (x: number, y: number) => {
    if (x - 1 < 0) return false; // Left boundary
    if (grid[y][x - 1]) return false; // Block to left
    return true;
  };

  // Place block in grid
  const placeBlock = (x: number, y: number) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);
      newGrid[y][x] = true;
      return newGrid;
    });
  };

  // Spawn new block - always at rightmost column
  const spawnBlock = () => {
    // Check if grid is completely full
    if (grid.every((row) => row.every((cell) => cell))) {
      return null;
    }
    return { x: gridWidth - 1, y: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBlock((current) => {
        if (!current) {
          return spawnBlock();
        }

        const { x, y } = current;

        // If can move down, do it
        if (canMoveDown(x, y)) {
          return { x, y: y + 1 };
        }

        // If can't move down, try to move left
        if (canMoveLeft(x, y)) {
          return { x: x - 1, y };
        }

        // Can't move anymore, place block
        placeBlock(x, y);

        // Spawn new block
        return spawnBlock();
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval, grid]);

  return (
    <div className={cn("h-fit w-fit whitespace-pre font-mono", className)}>
      {grid.map((row, y) => (
        <div key={y}>
          {row.map((cell, x) => (
            <span key={x} className="tracking-[0.5em]">
              {cell || (block && block.x === x && block.y === y)
                ? filledChar
                : emptyChar}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};



================================================
FILE: components/logo.tsx
================================================
export type LogoStyle = "e2b" | "fragments";

export default function Logo({
  style = "e2b",
  ...props
}: { style?: LogoStyle } & React.SVGProps<SVGSVGElement>) {
  return style === "fragments" ? (
    <svg
      {...props}
      viewBox="0 0 232 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M230.85 113.23L193.6 75.9799C192.87 75.2399 191.87 74.8299 190.83 74.8299H162.56C159.13 74.8299 157.17 72.8699 157.17 69.4399V41.1599C157.17 40.1199 156.76 39.1199 156.02 38.3899L118.77 1.14994C117.24 -0.380059 114.76 -0.380059 113.23 1.14994L75.9799 38.3999C75.2399 39.1399 74.8299 40.1299 74.8299 41.1699V69.4399C74.8299 72.8699 72.8699 74.8299 69.4399 74.8299H41.1699C40.1299 74.8299 39.1299 75.2399 38.3999 75.9799L1.14994 113.23C-0.380059 114.76 -0.380059 117.24 1.14994 118.77L38.3999 156.02C39.1399 156.75 40.1299 157.17 41.1699 157.17H69.4599C72.8799 157.17 74.8399 159.13 74.8399 162.56V190.83C74.8399 191.87 75.2499 192.87 75.9899 193.6L113.24 230.85C114.77 232.38 117.25 232.38 118.78 230.85L156.03 193.6C156.76 192.87 157.18 191.87 157.18 190.83V162.54C157.18 159.12 159.14 157.16 162.57 157.16H190.84C191.88 157.16 192.88 156.75 193.61 156.01L230.86 118.76C232.39 117.23 232.39 114.75 230.86 113.21L230.85 113.23ZM189.68 118.77L151.28 157.16L118.76 189.68C117.23 191.21 114.75 191.21 113.22 189.68L74.8199 151.28L42.2999 118.77C40.7699 117.24 40.7699 114.76 42.2999 113.22L80.6999 74.8199L113.22 42.2999C114.75 40.7699 117.23 40.7699 118.76 42.2999L157.16 80.6999L189.67 113.22C191.2 114.75 191.2 117.23 189.67 118.77H189.68Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      {...props}
      viewBox="0 0 224 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M188.212 157.998C186.672 157.998 185.71 159.665 186.48 160.998L202.585 188.894C203.476 190.437 202.056 192.287 200.335 191.826L151.491 178.737C149.357 178.165 147.163 179.432 146.592 181.566L133.504 230.411C133.042 232.132 130.731 232.436 129.84 230.893L113.732 202.992C112.962 201.659 111.037 201.659 110.268 202.992L94.1595 230.893C93.2686 232.436 90.9568 232.132 90.4956 230.411L77.4075 181.566C76.8357 179.432 74.6423 178.165 72.5085 178.737L23.664 191.826C21.9429 192.287 20.5234 190.437 21.4143 188.894L37.5192 160.998C38.289 159.665 37.3267 157.998 35.7871 157.998L3.57893 157.998C1.79713 157.998 0.904821 155.844 2.16476 154.584L37.9218 118.827C39.484 117.265 39.484 114.733 37.9218 113.171L2.16478 77.4133C0.904844 76.1533 1.7972 73.999 3.57902 73.9991L35.7837 73.9995C37.3233 73.9995 38.2856 72.3328 37.5158 70.9995L21.4143 43.11C20.5234 41.5669 21.9429 39.717 23.664 40.1781L72.5085 53.2665C74.6423 53.8383 76.8357 52.572 77.4075 50.4381L90.4956 1.59292C90.9568 -0.128187 93.2686 -0.432531 94.1595 1.11058L110.267 29.0111C111.037 30.3445 112.962 30.3445 113.732 29.0111L129.84 1.11058C130.73 -0.432532 133.042 -0.128189 133.503 1.59292L146.592 50.4381C147.163 52.572 149.357 53.8383 151.491 53.2665L200.335 40.1781C202.056 39.717 203.476 41.5669 202.585 43.11L186.483 70.9995C185.713 72.3328 186.676 73.9995 188.215 73.9995L220.421 73.9991C222.203 73.999 223.095 76.1533 221.835 77.4133L186.078 113.171C184.516 114.733 184.516 117.265 186.078 118.827L221.835 154.584C223.095 155.844 222.203 157.998 220.421 157.998L188.212 157.998ZM175.919 81.3306C177.366 79.8837 175.963 77.4549 173.987 77.9845L130.491 89.6396C128.357 90.2114 126.164 88.9451 125.592 86.8112L113.931 43.293C113.402 41.3166 110.597 41.3166 110.068 43.293L98.4069 86.8112C97.8351 88.9451 95.6418 90.2114 93.5079 89.6396L50.0136 77.9849C48.0371 77.4553 46.6348 79.8841 48.0817 81.331L79.9216 113.171C81.4837 114.733 81.4837 117.266 79.9216 118.828L48.0742 150.675C46.6273 152.122 48.0296 154.55 50.0061 154.021L93.5079 142.364C95.6418 141.792 97.8351 143.059 98.4069 145.192L110.068 188.711C110.597 190.687 113.402 190.687 113.931 188.711L125.592 145.192C126.164 143.059 128.357 141.792 130.491 142.364L173.994 154.021C175.971 154.551 177.373 152.122 175.926 150.675L144.079 118.828C142.516 117.266 142.516 114.733 144.079 113.171L175.919 81.3306Z"
        fill="currentColor"
      />
    </svg>
  );
}



================================================
FILE: components/markdown.tsx
================================================
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <pre
          {...props}
          className={`${className} text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll bg-[#F5F5F5] p-2 rounded mt-2 dark:bg-[#1E1E1E]`}
        >
          <code className={match[1]}>{children}</code>
        </pre>
      ) : (
        <code
          {...props}
          className={`${className} text-sm bg-[#F5F5F5] dark:bg-[#1E1E1E] py-0.5 px-1 rounded`}
        >
          {children}
        </code>
      );
    },
    ol: ({ node, children, ...props }: any) => (
      <ol className="list-decimal ml-6" {...props}>
        {children}
      </ol>
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="py-1" {...props}>
        {children}
      </li>
    ),
    ul: ({ node, children, ...props }: any) => (
      <ul className="list-decimal list-inside ml-4" {...props}>
        {children}
      </ul>
    ),
    strong: ({ node, children, ...props }: any) => (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    ),
    p: ({ children }: any) => {
      return (
        <p className="whitespace-pre-wrap break-words">
          {children}
        </p>
      );
    }
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = React.memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);


================================================
FILE: components/providers.tsx
================================================
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
} 


================================================
FILE: components/repo-banner.tsx
================================================
import { GitHubIcon } from "./icons";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";

const REPO_URL = "https://github.com/e2b-dev/surf";

export function RepoBanner() {
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View CUSE repository on GitHub`}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "bg-fg overflow-hidden hover:scale-[1.01] hover:bg-fg/80 font-light px-3 py-1.5",
        "gap-2 w-fit flex items-center shadow-sm ml-auto border",
        "transition-all duration-300 group relative",
        "before:absolute before:w-full before:h-full before:bg-[radial-gradient(circle_at_50%_-50%,rgba(0,0,0,0.1),transparent_70%)] dark:before:bg-[radial-gradient(circle_at_50%_-100%,rgba(0,0,0,0.1),transparent_70%)] before:pointer-events-none"
      )}
    >
      <GitHubIcon className="w-4 h-4 text-bg" aria-hidden="true" />
      <Separator
        orientation="vertical"
        className="h-6 bg-[hsl(var(--border))]"
        aria-hidden="true"
      />
      <p className="text-xs md:text-sm font-light text-bg tracking-wide">
        Star on GitHub
      </p>
      <div
        className="flex items-center gap-1 text-bg/80"
        role="status"
        aria-live="polite"
      >
        <StarFilledIcon
          className="w-4 h-4 text-bg transition-transform group-hover:rotate-[90deg] duration-200 ease-in-out"
          aria-label="GitHub stars"
        />
      </div>
    </a>
  );
}



================================================
FILE: components/scanline.tsx
================================================
import { cn } from "@/lib/utils";

interface ScanlineProps {
  className?: string;
}

export default function Scanline({ className }: ScanlineProps) {
  return (
    <div
      className={cn(
        "text-border/80 absolute inset-0 h-full w-full overflow-hidden",
        className
      )}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <pattern
            id="scanlines"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="5"
              x2="5"
              y2="0"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#scanlines)" />
      </svg>
    </div>
  );
}



================================================
FILE: components/surfing.tsx
================================================
interface SurfingProps {
  className?: string;
}

export function Surfing({ className }: SurfingProps) {
  return (
    <pre className={className}>
      <code>{`
                       ..
                   .+....:
                   :~.~+=*
                  .:....~+       ..
              +++++**..=}}[())<)(:
          ~^)(][[[[[[}{{{)}}}]^
        -(]}[)-){#{{{{{{~
       <[{(   -)#######(
      ..^     *[{{{{#{}(<>^.
     ..       ^(](]}#{}[(<><)
              ++<><(   :){{{{.   .~:
              -=^*>)     .##{=.--   .~::
               *^><)  :===}#{-    ~::+*
              +^]][]===~..:*^-..-.-++
            -^({{{>=~ --    := :=++
           =^}}<=.:-.    :-.:~=++
         =~=-- -~     :~.:===++
      :++~ -...   .~- -====*~
    .~-:~-  :::-~-:~===++=
   -+~     :=~ ~====+*~
  .    :~---=++**+:
  ~+++=++**+:
        `}</code>
    </pre>
  );
}



================================================
FILE: components/use-scroll-to-bottom.ts
================================================
import { useEffect, useRef, RefObject } from "react";

export function useScrollToBottom<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T>,
  RefObject<T>,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      const observer = new MutationObserver(() => {
        end.scrollIntoView({ behavior: "smooth" });
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, []);

  return [containerRef as RefObject<T>, endRef as RefObject<T>];
}



================================================
FILE: components/chat/example-prompts.tsx
================================================
"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExamplePromptProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Individual example prompt button
 */
export function ExamplePrompt({ text, onClick, disabled }: ExamplePromptProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="lg"
      className="text-left whitespace-normal text-sm sm:text-base h-auto py-2 px-3 sm:px-4"
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

interface ExamplePromptsProps {
  onPromptClick: (prompt: string) => void;
  prompts?: Array<{ text: string; prompt: string }>;
  disabled?: boolean;
  className?: string;
}

/**
 * Example prompts container with default prompts
 */
export function ExamplePrompts({
  onPromptClick,
  prompts = [
    {
      text: "Create a JavaScript script",
      prompt:
        "Create a simple JavaScript script that calculates the Fibonacci sequence and save it to a file",
    },
    {
      text: "Edit a document in VS Code",
      prompt:
        "Open VS Code and create a simple React component that displays a counter",
    },
    {
      text: "Browse GitHub",
      prompt:
        "Open Firefox and go to GitHub to search for popular machine learning repositories",
    },
    {
      text: "Create a spreadsheet",
      prompt:
        "Open LibreOffice Calc and create a simple budget spreadsheet with formulas",
    },
  ],
  disabled = false,
  className,
}: ExamplePromptsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 sm:gap-4 mx-auto my-4 sm:my-6 w-full max-w-[600px] px-4",
        className
      )}
    >
      <div className="flex items-center gap-2 text-accent">
        <Terminal className="w-4 h-4" />
        <span className="text-sm font-mono">Try these examples</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center w-full px-2 sm:px-0 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-[#EBEBEB] dark:scrollbar-thumb-[#333333] scrollbar-track-transparent">
        {prompts.map((item, index) => (
          <ExamplePrompt
            key={index}
            text={item.text}
            onClick={() => onPromptClick(item.prompt)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}



================================================
FILE: components/chat/input.tsx
================================================
"use client";

import React, { useMemo } from "react";
import { OpenAiLogo } from "@phosphor-icons/react";
import { ChevronsRight, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { useChat } from "@/lib/chat-context";
import { Input } from "../ui/input";
import { AnthropicLogo } from "../icons";
import { motion } from "motion/react";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onStop: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

/**
 * Chat input component with submit and stop buttons
 */
export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  onStop,
  disabled = false,
  placeholder = "What are we surfing today?",
  className,
}: ChatInputProps) {
  const { model, setModel } = useChat();

  const isInputEmpty = useMemo(() => input.trim() === "", [input]);

  return (
    <form onSubmit={onSubmit} className={cn(className)}>
      <div className="flex items-center">
        <div className="relative flex-1 flex items-center gap-2">
          {/* CURRENTLY NOT USED */}
          {/*  <Select value={model} onValueChange={setModel} disabled={disabled}>
            <SelectTrigger
              className="absolute rounded-lg left-1.5 z-10 inset-y-1.5 border-border-200 w-min aspect-square h-auto flex items-center justify-center hover:bg-bg focus:bg-bg"
              withIcon={false}
            >
              {model == "openai" ? (
                <OpenAiLogo className="size-5" />
              ) : (
                <AnthropicLogo className="size-5" />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Model</SelectLabel>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <Input
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            required
            disabled={disabled}
            className="w-full pr-16"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isLoading ? (
              <Button
                type="button"
                onClick={onStop}
                variant="error"
                size="iconLg"
                disabled={disabled}
                title="Stop generating"
              >
                <StopCircle className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                size="iconLg"
                disabled={disabled || isInputEmpty}
                title="Send message"
              >
                <motion.span
                  animate={{
                    rotate: isInputEmpty ? 0 : -90,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                >
                  <ChevronsRight className="w-5 h-5" />
                </motion.span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}



================================================
FILE: components/chat/loader.tsx
================================================
import React, { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChatLoaderProps {
  text?: ReactNode;
  className?: string;
  dotClassName?: string;
  interval?: number;
}

export function ChatLoader({
  text = "surfing",
  className,
  dotClassName,
  interval = 200,
}: ChatLoaderProps) {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev % 3) + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={cn("flex items-center font-mono text-xs", className)}>
      <span>{text}</span>
      <span className={cn("inline-flex ml-1", dotClassName)}>
        {".".repeat(dots)}
        <span className="invisible">{".".repeat(3 - dots)}</span>
      </span>
    </div>
  );
}



================================================
FILE: components/chat/message-list.tsx
================================================
"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage } from "@/components/chat/message";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatListProps {
  messages: ChatMessageType[];
  className?: string;
}

export function ChatList({ messages, className }: ChatListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-y-auto p-4 pb-22", "space-y-4", className)}
    >
      {messages.length !== 0 &&
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            className="animate-fade-slide-in"
          />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
}



================================================
FILE: components/chat/message.tsx
================================================
"use client";

import React from "react";
import {
  ChatMessage as ChatMessageType,
  ActionChatMessage,
  AssistantChatMessage,
} from "@/types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import {
  Terminal,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Info,
} from "lucide-react";
import { useChat } from "@/lib/chat-context";
import { Badge } from "../ui/badge";
import { OpenAiLogo } from "@phosphor-icons/react";
import { AnthropicLogo } from "../icons";

const messageVariants = cva("", {
  variants: {
    role: {
      user: "bg-accent/15 text-accent-fg border-accent-300",
      assistant: "bg-bg-100 text-fg border-border-100",
      system: "bg-bg-100 text-fg-300 border-border italic",
    },
  },
  defaultVariants: {
    role: "system",
  },
});

interface ChatMessageProps extends VariantProps<typeof messageVariants> {
  message: ChatMessageType;
  className?: string;
}

function ActionMessageDisplay({
  message,
  className,
}: {
  message: ActionChatMessage;
  className?: string;
}) {
  const { action, status } = message;

  const formatAction = (action: any): string => {
    if (!action) return "No action details";

    try {
      return JSON.stringify(action, null, 2);
    } catch (e) {
      return "Unable to display action details";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 text-success" />;
      case "failed":
        return <AlertCircle className="h-3 w-3 text-error" />;
      case "pending":
        return <Clock className="h-3 w-3 text-warning animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex justify-start", className)}>
      <Card
        className="max-w-[85%] overflow-hidden border border-border-200 bg-bg-100 dark:bg-bg-200"
        variant="slate"
      >
        <CardContent className="p-3">
          <div className="text-xs mb-2 font-mono uppercase tracking-wider text-fg-300 flex items-center gap-1">
            <Terminal className="h-3 w-3" />
            <span>Action</span>
            {status && (
              <div className="ml-2 flex items-center gap-1">
                {getStatusIcon()}
                <span className="text-xs capitalize">{status}</span>
              </div>
            )}
          </div>

          <div className="bg-bg-200 dark:bg-bg-300 p-2 rounded font-mono text-xs tracking-wide text-fg-100 overflow-x-auto mb-3">
            <code>{formatAction(action)}</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  const role = message.role;

  const isUser = role === "user";
  const isAssistant = role === "assistant";
  const isAction = role === "action";
  const isSystem = role === "system";
  const isError = "isError" in message && message.isError;

  const { model } = useChat();

  if (isSystem) {
    return (
      <div className={cn("w-full flex justify-center", className)}>
        <Badge variant={isError ? "error" : "muted"}>{message.content}</Badge>
      </div>
    );
  }

  if (isAction) {
    return (
      <ActionMessageDisplay
        message={message as ActionChatMessage<typeof model>}
        className={className}
      />
    );
  }

  const getRoleIcon = () => {
    if (isUser) return <User className="h-3 w-3" />;
    if (isAssistant) {
      if ((message as AssistantChatMessage).model === "openai") {
        return <OpenAiLogo className="h-3 w-3" />;
      } else {
        return <AnthropicLogo className="h-3 w-3" />;
      }
    }
    return <Info className="h-3 w-3" />;
  };

  const roleLabel = isUser ? "You" : isAssistant ? "Assistant" : "System";

  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      <Card
        className={cn(
          "max-w-[85%] overflow-hidden border",
          messageVariants({ role })
        )}
        variant="slate"
      >
        <CardContent className="p-3">
          <div className="text-xs mb-2 font-mono uppercase tracking-wider text-fg-300 flex items-center gap-1">
            {getRoleIcon()}
            <span>{roleLabel}</span>
          </div>
          <div className="whitespace-pre-wrap break-words font-sans text-sm tracking-wide">
            {message.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



================================================
FILE: components/ui/badge.tsx
================================================
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex gap-1 items-center px-2 rounded-sm py-1 text-xs font-mono font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-fg text-bg hover:bg-fg-200",
        muted: "bg-bg-200 text-fg-500",
        success: "bg-success/20 text-success",
        warning: "bg-warning/20 text-warning",
        error: "bg-error/20 text-error",
        accent: "bg-accent/15 text-accent",
        "contrast-1": "bg-contrast-1/20 text-contrast-1",
        "contrast-2": "bg-contrast-2/20 text-contrast-2",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };



================================================
FILE: components/ui/button.tsx
================================================
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";

const buttonVariants = cva(
  [
    "inline-flex items-center cursor-pointer gap-2 rounded-sm justify-center whitespace-nowrap",
    "font-mono uppercase tracking-wider text-sm",
    "transition-colors duration-150",
    "focus-visible:outline-none ",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-fg text-bg",
          "hover:bg-fg-100 focus:bg-fg-100",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        accent: [
          "bg-accent/10 text-accent",
          "hover:bg-accent/20 focus:bg-accent/20",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        ghost: [
          "bg-transparent",
          "hover:bg-transparent focus:bg-transparent",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        muted: [
          "border border-border-200 bg-bg-200 text-fg-300 hover:text-fg",
          "hover:bg-bg-200/90 focus:bg-bg-200/90",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        error: [
          "bg-error/10 text-error",
          "hover:bg-error/20 focus:bg-error/20",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        outline: [
          "border border-border bg-transparent",
          "hover:bg-bg-300/80 focus:bg-bg-300/80",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        link: [
          "text-accent underline-offset-4",
          "hover:underline hover:bg-transparent",
          "focus:ring-0 focus:underline focus:bg-transparent",
          "shadow-none",
        ].join(" "),
      },
      size: {
        default: "h-8 px-3",
        sm: "h-7 px-2",
        lg: "h-10 px-4",
        icon: "h-8 w-8",
        iconSm: "h-7 w-7",
        iconLg: "h-10 w-10 text-xl",
        slate: "h-auto px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            {props.children}
            <Loader />
          </div>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };



================================================
FILE: components/ui/card.tsx
================================================
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const cardVariants = cva("rounded-sm", {
  variants: {
    variant: {
      default: "bg-bg text-fg",
      layer: "bg-bg-200/60 backdrop-blur-lg border border-border",
      slate: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hideUnderline?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hideUnderline = false, variant = "slate", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant: variant }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-mono tracking-wider",
      "text-lg leading-none font-medium",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-fg-300 text-sm", "tracking-wide", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-3", "text-sm tracking-wide", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6",
      "mt-6 border-t border-dashed",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};



================================================
FILE: components/ui/cctv.tsx
================================================
'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface CctvIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const dotVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};

const cctvVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -15, 10, 0],
    originX: '9px',
    originY: '15px',
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

const CctvIcon = forwardRef<CctvIconHandle, HTMLAttributes<HTMLDivElement>>(
  ({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );
    return (
      <div
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.g variants={cctvVariants} animate={controls}>
            <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
            <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
            <motion.path
              d="M7 9h.01"
              variants={dotVariants}
              animate={controls}
            />
          </motion.g>
          <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
          <path d="M2 21v-4" />
        </svg>
      </div>
    );
  }
);

CctvIcon.displayName = 'CctvIcon';

export { CctvIcon };



================================================
FILE: components/ui/cursor-click.tsx
================================================
'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface CursorClickIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const cursorVariants: Variants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 0, -3, 0],
    y: [0, -4, 0, 0],
    transition: {
      duration: 1,
      bounce: 0.3,
    },
  },
};

const lineVariants: Variants = {
  initial: { opacity: 1, x: 0, y: 0 },
  spread: (custom: { x: number; y: number }) => ({
    opacity: [0, 1, 0, 0, 0, 0, 1],
    x: [0, custom.x, 0, 0],
    y: [0, custom.y, 0, 0],
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 10,
      mass: 0.4,
    },
  }),
};

const CursorClickIcon = forwardRef<
  CursorClickIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const clickControls = useAnimation();
  const cursorControls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => {
        cursorControls.start('hover');
        clickControls.start('spread', { delay: 1.3 });
      },
      stopAnimation: () => {
        cursorControls.start('initial');
        clickControls.start('initial');
      },
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        cursorControls.start('hover');
        clickControls.start('spread', { delay: 1.3 });
      } else {
        onMouseEnter?.(e);
      }
    },
    [clickControls, cursorControls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        cursorControls.start('initial');
        clickControls.start('initial');
      } else {
        onMouseLeave?.(e);
      }
    },
    [cursorControls, clickControls, onMouseLeave]
  );

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
          variants={cursorVariants}
          animate={cursorControls}
        />
        <motion.path
          d="M14 4.1 12 6"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: 1, y: -1 }}
        />
        <motion.path
          d="m5.1 8-2.9-.8"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: -1, y: 0 }}
        />
        <motion.path
          d="m6 12-1.9 2"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: -1, y: 1 }}
        />
        <motion.path
          d="M7.2 2.2 8 5.1"
          variants={lineVariants}
          animate={clickControls}
          custom={{ x: 0, y: -1 }}
        />
      </svg>
    </div>
  );
});

CursorClickIcon.displayName = 'CursorClickIcon';

export { CursorClickIcon };



================================================
FILE: components/ui/grid-pattern.tsx
================================================
import { useId } from "react";

import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  className?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  gradientDegrees?: number;
  [key: string]: unknown;
}

export function GridPattern({
  width = 50,
  height = 50,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  gradientFrom = "rgba(255,255,255,0.3)",
  gradientVia = "rgba(255,255,255,0.15)",
  gradientTo = "rgba(255,255,255,0)",
  gradientDegrees = 180,
  ...props
}: GridPatternProps) {
  const id = useId();
  const gradientId = `gradient-${id}`;
  const maskId = `mask-${id}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientTransform={`rotate(${gradientDegrees})`}
        >
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="50%" stopColor={gradientVia} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>

        <mask id={maskId}>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              stroke="white"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
          {squares && (
            <svg x={x} y={y} className="overflow-visible">
              {squares.map(([x, y]) => (
                <rect
                  key={`${x}-${y}`}
                  width={width - 1}
                  height={height - 1}
                  x={x * width + 1}
                  y={y * height + 1}
                  fill="white"
                />
              ))}
            </svg>
          )}
        </mask>
      </defs>

      {/* Main rectangle with gradient and mask */}
      <rect
        width="100%"
        height="100%"
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

export default GridPattern;



================================================
FILE: components/ui/input.tsx
================================================
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-14 px-4 pr-[100px] bg-bg-300/60 backdrop-blur-sm",
        "text-fg dark:text-fg rounded-md",
        "border border-border-200 shadow-lg",
        "font-mono tracking-wide text-sm",
        "outline-none  transition-all duration-200",
        "placeholder:text-fg-300 dark:placeholder:text-fg-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Input };



================================================
FILE: components/ui/keyboard.tsx
================================================
'use client';

import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface KeyboardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const KEYBOARD_PATHS = [
  { id: 'key1', d: 'M10 8h.01' },
  { id: 'key2', d: 'M12 12h.01' },
  { id: 'key3', d: 'M14 8h.01' },
  { id: 'key4', d: 'M16 12h.01' },
  { id: 'key5', d: 'M18 8h.01' },
  { id: 'key6', d: 'M6 8h.01' },
  { id: 'key7', d: 'M7 16h10' },
  { id: 'key8', d: 'M8 12h.01' },
];

const KeyboardIcon = forwardRef<
  KeyboardIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => setIsHovered(true),
      stopAnimation: () => setIsHovered(false),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        setIsHovered(true);
      } else {
        onMouseEnter?.(e);
      }
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        setIsHovered(false);
      } else {
        onMouseLeave?.(e);
      }
    },
    [onMouseLeave]
  );

  useEffect(() => {
    const animateKeys = async () => {
      if (isHovered) {
        await controls.start((i) => ({
          opacity: [1, 0.2, 1],
          transition: {
            duration: 1.5,
            times: [0, 0.5, 1],
            delay: i * 0.2 * Math.random(),
            repeat: 1,
            repeatType: 'reverse',
          },
        }));
      } else {
        controls.stop();
        controls.set({ opacity: 1 });
      }
    };

    animateKeys();
  }, [isHovered, controls]);

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <AnimatePresence>
          {KEYBOARD_PATHS.map((path, index) => (
            <motion.path
              key={path.id}
              d={path.d}
              initial={{ opacity: 1 }}
              animate={controls}
              custom={index}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
});

KeyboardIcon.displayName = 'KeyboardIcon';

export { KeyboardIcon };



================================================
FILE: components/ui/route.tsx
================================================
'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface RouteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const circleTransition: Transition = {
  duration: 0.3,
  delay: 0.1,
  opacity: { delay: 0.15 },
};

const circleVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
  },
};

const RouteIcon = forwardRef<RouteIconHandle, HTMLAttributes<HTMLDivElement>>(
  ({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            cx="6"
            cy="19"
            r="3"
            transition={circleTransition}
            variants={circleVariants}
            animate={controls}
          />
          <motion.path
            d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"
            transition={{ duration: 0.7, delay: 0.5, opacity: { delay: 0.5 } }}
            variants={{
              normal: {
                pathLength: 1,
                opacity: 1,
                pathOffset: 0,
              },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                pathOffset: [1, 0],
              },
            }}
            animate={controls}
          />
          <motion.circle
            cx="18"
            cy="5"
            r="3"
            transition={circleTransition}
            variants={circleVariants}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

RouteIcon.displayName = 'RouteIcon';

export { RouteIcon };



================================================
FILE: components/ui/scroll-area.tsx
================================================
"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };



================================================
FILE: components/ui/select.tsx
================================================
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import {
  menuContentStyles,
  menuLabelStyles,
  menuSeparatorStyles,
  menuViewportStyles,
  menuGroupStyles,
  menuItemVariants,
} from "./shared-menu-styles";

const Select = SelectPrimitive.Root;

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Group
    ref={ref}
    className={cn(menuGroupStyles, className)}
    {...props}
  />
));
SelectGroup.displayName = SelectPrimitive.Group.displayName;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    withIcon?: boolean;
  }
>(({ className, children, withIcon = true, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md",
      "bg-bg border cursor-pointer px-3 py-2",
      "font-mono text-sm tracking-wider uppercase",
      "transition-colors outline-none",
      "focus:bg-bg-100 active:translate-y-[1px]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      "data-[placeholder]:text-fg-300",
      className
    )}
    {...props}
  >
    {children}
    {withIcon && <ChevronsUpDown className="text-fg-300 ml-2 size-3.5" />}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 font-mono",
      className
    )}
    {...props}
  >
    ▲
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 font-mono",
      className
    )}
    {...props}
  >
    ▼
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(menuContentStyles, "animate-fade-slide-in", className)}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          menuViewportStyles,
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <span
    className={cn(
      "inline-flex items-center py-1.5 first:pt-0 last:pb-0",
      inset && "pl-8"
    )}
  >
    <SelectPrimitive.Label
      ref={ref}
      className={cn(menuLabelStyles, className)}
      {...props}
    />
  </span>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    variant?: "default" | "error" | "success" | "warning";
  }
>(({ className, children, variant = "default", ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(menuItemVariants({ variant }), "pr-8", className)}
    {...props}
  >
    <span className="text-accent absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>{"<<"}</SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(menuSeparatorStyles, className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};



================================================
FILE: components/ui/separator.tsx
================================================
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }



================================================
FILE: components/ui/shared-menu-styles.ts
================================================
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { cardVariants } from "./card";

export const menuItemVariants = cva(
  [
    "relative flex cursor-pointer rounded-sm select-none items-center gap-2",
    "px-2 py-1.5",
    "font-mono text-xs",
    "outline-none",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "focus:bg-accent/10 focus:text-accent",
        error: "text-red-500 focus:bg-red-500/10 focus:text-red-500",
        success: "text-green-500 focus:bg-green-500/10 focus:text-green-500",
        warning: "text-yellow-500 focus:bg-yellow-500/10 focus:text-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const menuContentStyles = cn(
  "z-50 min-w-[8rem] overflow-hidden rounded-sm p-2",
  cardVariants({ variant: "layer" }),
  "shadow-sm",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=top]:slide-in-from-bottom-2"
);

export const menuLabelStyles = cn("font-mono text-xs uppercase", "text-fg-500");

export const menuSeparatorStyles = cn(
  "-mx-2 my-2",
  "border-t border-dashed border-border-200"
);

export const menuViewportStyles = cn("p-1");

export const menuGroupStyles = cn("flex flex-col gap-0.5 pt-2 first:pt-0");



================================================
FILE: components/ui/skeleton.tsx
================================================
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }



================================================
FILE: lib/chat-context.tsx
================================================
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  ChatMessage,
  ChatState,
  ParsedSSEEvent,
  SendMessageOptions,
  ActionChatMessage,
  UserChatMessage,
  AssistantChatMessage,
  SystemChatMessage,
} from "@/types/chat";
import { ComputerModel, SSEEventType } from "@/types/api";
import { logDebug, logError } from "./logger";

interface ChatContextType extends ChatState {
  sendMessage: (options: SendMessageOptions) => Promise<void>;
  stopGeneration: () => void;
  clearMessages: () => void;
  setInput: (input: string) => void;
  input: string;
  handleSubmit: (e: React.FormEvent) => string | undefined;
  onSandboxCreated: (
    callback: (sandboxId: string, vncUrl: string) => void
  ) => void;
  model: ComputerModel;
  setModel: (model: ComputerModel) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const onSandboxCreatedRef = useRef<
    ((sandboxId: string, vncUrl: string) => void) | undefined
  >(undefined);
  const [model, setModel] = useState<ComputerModel>("openai");

  const parseSSEEvent = (data: string): ParsedSSEEvent<typeof model> | null => {
    try {
      if (!data || data.trim() === "") {
        return null;
      }

      if (data.startsWith("data: ")) {
        const jsonStr = data.substring(6).trim();

        if (!jsonStr) {
          return null;
        }

        return JSON.parse(jsonStr);
      }

      const match = data.match(/data: ({.*})/);
      if (match && match[1]) {
        return JSON.parse(match[1]);
      }

      return JSON.parse(data);
    } catch (e) {
      logError(
        "Error parsing SSE event:",
        e,
        "Data:",
        data.substring(0, 200) + (data.length > 200 ? "..." : "")
      );
      return null;
    }
  };

  const sendMessage = async ({
    content,
    sandboxId,
    environment,
    resolution,
  }: SendMessageOptions) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      role: "user",
      content,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    abortControllerRef.current = new AbortController();

    try {
      const apiMessages = messages
        .concat(userMessage)
        .filter((msg) => msg.role === "user" || msg.role === "assistant")
        .map((msg) => {
          const typedMsg = msg as UserChatMessage | AssistantChatMessage;
          return {
            role: typedMsg.role,
            content: typedMsg.content,
          };
        });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          sandboxId,
          environment,
          resolution,
          model,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body is null");

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          id: `system-message-${Date.now()}`,
          content: "Task started",
        },
      ]);

      const decoder = new TextDecoder();
      let assistantMessage = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          if (buffer.trim()) {
            const parsedEvent = parseSSEEvent(buffer);
            if (parsedEvent) {
              if (parsedEvent.type === SSEEventType.DONE) {
                setMessages((prev) => {
                  const systemMessage: SystemChatMessage = {
                    role: "system",
                    id: `system-${Date.now()}`,
                    content: "Task completed",
                  };

                  return [...prev, systemMessage];
                });
                setIsLoading(false);
              }
            }
          }
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const events = buffer.split("\n\n");

        buffer = events.pop() || "";

        for (const event of events) {
          if (!event.trim()) continue;

          const parsedEvent = parseSSEEvent(event);
          if (!parsedEvent) continue;

          if (process.env.NODE_ENV === "development") {
            logDebug("Parsed event:", parsedEvent);
          }

          switch (parsedEvent.type) {
            case SSEEventType.ACTION:
              if (parsedEvent.action) {
                const actionMessage: ActionChatMessage<typeof model> = {
                  role: "action",
                  id: `action-${Date.now()}`,
                  action: parsedEvent.action,
                  status: "pending",
                  model,
                };

                setMessages((prev) => [...prev, actionMessage]);
              }
              break;

            case SSEEventType.REASONING:
              if (typeof parsedEvent.content === "string") {
                assistantMessage = parsedEvent.content;
                const reasoningMessage: AssistantChatMessage = {
                  role: "assistant",
                  id: `assistant-${Date.now()}-${messages.length}`,
                  content: assistantMessage,
                  model,
                };
                setMessages((prev) => [...prev, reasoningMessage]);
              }
              break;

            case SSEEventType.DONE:
              setMessages((prev) => {
                const systemMessage: SystemChatMessage = {
                  role: "system",
                  id: `system-${Date.now()}`,
                  content: parsedEvent.content || "Task completed",
                };

                return [...prev, systemMessage];
              });
              setIsLoading(false);
              break;

            case SSEEventType.ERROR:
              setError(parsedEvent.content);
              setMessages((prev) => [
                ...prev,
                {
                  role: "system",
                  id: `system-${Date.now()}`,
                  content: parsedEvent.content,
                  isError: true,
                },
              ]);
              setIsLoading(false);
              break;

            case SSEEventType.SANDBOX_CREATED:
              if (
                parsedEvent.sandboxId &&
                parsedEvent.vncUrl &&
                onSandboxCreatedRef.current
              ) {
                onSandboxCreatedRef.current(
                  parsedEvent.sandboxId,
                  parsedEvent.vncUrl
                );
              }
              break;

            case SSEEventType.ACTION_COMPLETED:
              setMessages((prev) => {
                const lastActionIndex = [...prev]
                  .reverse()
                  .findIndex((msg) => msg.role === "action");

                if (lastActionIndex !== -1) {
                  const actualIndex = prev.length - 1 - lastActionIndex;

                  return prev.map((msg, index) =>
                    index === actualIndex
                      ? { ...msg, status: "completed" }
                      : msg
                  );
                }

                return prev;
              });
              break;
          }
        }
      }
    } catch (error) {
      logError("Error sending message:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort(
          new DOMException("Generation stopped by user", "AbortError")
        );
        setIsLoading(false);
      } catch (error) {
        logError("Error stopping generation:", error);
        setIsLoading(false);
      }
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent): string | undefined => {
      e.preventDefault();
      if (!input.trim()) return;

      const content = input.trim();
      setInput("");
      return content;
    },
    [input]
  );

  const value = {
    messages,
    isLoading,
    error,
    input,
    setInput,
    sendMessage,
    stopGeneration,
    clearMessages,
    handleSubmit,
    model,
    setModel,
    onSandboxCreated: (
      callback: (sandboxId: string, vncUrl: string) => void
    ) => {
      onSandboxCreatedRef.current = callback;
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}



================================================
FILE: lib/config.ts
================================================
export const SANDBOX_TIMEOUT_MS = 300_000; // 5 minutes in milliseconds

// Resolution boundaries for performance optimization
// The sandbox will run at full resolution, but screenshots sent to the LLM API
// will be scaled down to these dimensions to reduce bandwidth and tokens.
export const MAX_RESOLUTION_WIDTH = 1024;
export const MAX_RESOLUTION_HEIGHT = 768;
export const MIN_RESOLUTION_WIDTH = 640;
export const MIN_RESOLUTION_HEIGHT = 480;

// Default resolution used when none is specified
// NOTE: This should be within the max/min bounds defined above,
// otherwise it will be scaled automatically
export const DEFAULT_RESOLUTION: [number, number] = [1024, 720];



================================================
FILE: lib/logger.ts
================================================
import ansis from "ansis";

export const logger = console;

const stringifyArg = (arg: unknown) =>
  typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg);

export const logError = (...args: Parameters<typeof console.error>) => {
  console.error(
    ansis.bgRedBright.white(" ERROR "),
    ansis.redBright(args.map(stringifyArg).join(" "))
  );
};

export const logDebug = (...args: Parameters<typeof console.debug>) => {
  console.debug(
    ansis.bgBlueBright.white(" DEBUG "),
    ansis.blueBright(args.map(stringifyArg).join(" "))
  );
};

export const logSuccess = (...args: Parameters<typeof console.log>) => {
  console.log(
    ansis.bgGreenBright.white(" SUCCESS "),
    ansis.greenBright(args.map(stringifyArg).join(" "))
  );
};

export const logWarning = (...args: Parameters<typeof console.warn>) => {
  console.warn(
    ansis.bgYellowBright.white(" WARNING "),
    ansis.yellowBright(args.map(stringifyArg).join(" "))
  );
};



================================================
FILE: lib/utils.ts
================================================
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



================================================
FILE: lib/streaming/anthropic.ts
================================================
import { Sandbox } from "@e2b/desktop";
import Anthropic from "@anthropic-ai/sdk";
import { SSEEventType, SSEEvent, sleep } from "@/types/api";
import {
  ComputerInteractionStreamerFacade,
  ComputerInteractionStreamerFacadeStreamProps,
} from "@/lib/streaming";
import { ActionResponse } from "@/types/api";
import {
  BetaMessageParam,
  BetaToolResultBlockParam,
  BetaToolUseBlock,
} from "@anthropic-ai/sdk/resources/beta/messages/messages.mjs";
import { ResolutionScaler } from "./resolution";
import { ComputerAction, ToolInput } from "@/types/anthropic";
import { logError } from "../logger";

const INSTRUCTIONS = `
You are Surf, a helpful assistant that can use a computer to help the user with their tasks.
You can use the computer to search the web, write code, and more.

Surf is built by E2B, which provides an open source isolated virtual computer in the cloud made for AI use cases.
This application integrates E2B's desktop sandbox with Anthropic's API to create an AI agent that can perform tasks
on a virtual computer through natural language instructions.

The screenshots that you receive are from a running sandbox instance, allowing you to see and interact with a real
virtual computer environment in real-time.

Since you are operating in a secure, isolated sandbox micro VM, you can execute most commands and operations without
worrying about security concerns. This environment is specifically designed for AI experimentation and task execution.

IMPORTANT NOTES:
1. You automatically receive a screenshot after each action you take. You DO NOT need to request screenshots separately.
2. When a user asks you to run a command in the terminal, ALWAYS press Enter immediately after typing the command.
3. When the user explicitly asks you to press any key (Enter, Tab, Ctrl+C, etc.) in any application or interface,
   you MUST do so immediately.
4. Remember: In terminal environments, commands DO NOT execute until Enter is pressed.
5. When working on complex tasks, continue to completion without stopping to ask for confirmation.
   Break down complex tasks into steps and execute them fully.

Please help the user effectively by observing the current state of the computer and taking appropriate actions.
`;

export class AnthropicComputerStreamer
  implements ComputerInteractionStreamerFacade
{
  public instructions: string;
  public desktop: Sandbox;
  public resolutionScaler: ResolutionScaler;
  private anthropic: Anthropic;

  constructor(desktop: Sandbox, resolutionScaler: ResolutionScaler) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not set");
    }

    this.desktop = desktop;
    this.resolutionScaler = resolutionScaler;
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.instructions = INSTRUCTIONS;
  }

  async executeAction(
    tool: BetaToolUseBlock & ToolInput
  ): Promise<ActionResponse | void> {
    const desktop = this.desktop;

    if (tool.name === "str_replace_editor") {
      const editorCommand = tool.input;

      switch (editorCommand.command) {
        default: {
        }
      }
      return;
    }

    if (tool.name === "bash") {
      const bashCommand = tool.input;

      switch (bashCommand.command) {
        case "command": {
          desktop.commands.run(bashCommand.command);
          return;
        }

        default: {
        }
      }

      return;
    }

    const action = tool.input;

    switch (action.action) {
      case "screenshot": {
        // that explicit screenshot actions are no longer necessary
        break;
      }

      case "double_click": {
        const [x, y] = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );
        if (action.text) {
          await desktop.moveMouse(x, y);
          await desktop.press(action.text);
        }
        await desktop.doubleClick(x, y);
        break;
      }

      case "triple_click": {
        const [x, y] = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );

        await desktop.moveMouse(x, y);
        if (action.text) {
          await desktop.press(action.text);
        }
        await desktop.leftClick();
        await desktop.leftClick();
        await desktop.leftClick();
        break;
      }

      case "left_click": {
        const [x, y] = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );

        if (action.text) {
          await desktop.moveMouse(x, y);
          await desktop.press(action.text);
        }
        await desktop.leftClick(x, y);
        break;
      }

      case "right_click": {
        const [x, y] = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );

        if (action.text) {
          await desktop.moveMouse(x, y);
          await desktop.press(action.text);
        }
        await desktop.rightClick(x, y);
        break;
      }

      case "middle_click": {
        const [x, y] = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );

        if (action.text) {
          await desktop.moveMouse(x, y);
          await desktop.press(action.text);
        }
        await desktop.middleClick(x, y);
        break;
      }

      case "type": {
        await desktop.write(action.text);
        break;
      }

      case "key": {
        await desktop.press(action.text);
        break;
      }

      case "hold_key": {
        await desktop.press(action.text);
        break;
      }

      case "mouse_move": {
        const [x, y] = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );

        await desktop.moveMouse(x, y);
        break;
      }

      case "left_mouse_down": {
        break;
      }

      case "left_mouse_up": {
        break;
      }

      case "left_click_drag": {
        const start = this.resolutionScaler.scaleToOriginalSpace(
          action.start_coordinate
        );
        const end = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );

        await desktop.drag(start, end);
        break;
      }

      case "scroll": {
        const [x, y] = this.resolutionScaler.scaleToOriginalSpace(
          action.coordinate
        );

        const direction = action.scroll_direction;
        const amount = action.scroll_amount;

        await desktop.moveMouse(x, y);

        if (action.text) {
          await desktop.press(action.text);
        }

        await desktop.scroll(direction === "up" ? "up" : "down", amount);
        break;
      }

      case "wait": {
        await sleep(action.duration * 1000);
        break;
      }

      case "cursor_position": {
        break;
      }

      default: {
      }
    }
  }

  async *stream(
    props: ComputerInteractionStreamerFacadeStreamProps
  ): AsyncGenerator<SSEEvent<"anthropic">> {
    const { messages, signal } = props;

    const anthropicMessages: BetaMessageParam[] = messages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: [{ type: "text", text: msg.content }],
    }));

    try {
      while (true) {
        if (signal?.aborted) {
          yield {
            type: SSEEventType.DONE,
            content: "Generation stopped by user",
          };
          break;
        }

        const modelResolution = this.resolutionScaler.getScaledResolution();

        const response = await this.anthropic.beta.messages.create({
          model: "claude-3-7-sonnet-latest",
          max_tokens: 4096,
          messages: anthropicMessages,
          system: this.instructions,
          tools: [
            {
              type: "computer_20250124",
              name: "computer",
              display_width_px: modelResolution[0],
              display_height_px: modelResolution[1],
            },
            {
              type: "bash_20250124",
              name: "bash",
            },
          ],
          betas: ["computer-use-2025-01-24"],
          thinking: { type: "enabled", budget_tokens: 1024 },
        });

        const toolUseBlocks: BetaToolUseBlock[] = [];
        let reasoningText = "";

        for (const block of response.content) {
          if (block.type === "tool_use") {
            toolUseBlocks.push(block);
          } else if (block.type === "text") {
            reasoningText += block.text;
          } else if (block.type === "thinking" && block.thinking) {
            yield {
              type: SSEEventType.REASONING,
              content: block.thinking,
            };
          }
        }

        if (reasoningText) {
          yield {
            type: SSEEventType.REASONING,
            content: reasoningText,
          };
        }

        if (toolUseBlocks.length === 0) {
          yield {
            type: SSEEventType.DONE,
          };
          break;
        }

        const assistantMessage: BetaMessageParam = {
          role: "assistant",
          content: response.content,
        };
        anthropicMessages.push(assistantMessage);

        const toolResults: BetaToolResultBlockParam[] = [];

        for await (const toolUse of toolUseBlocks) {
          yield {
            type: SSEEventType.ACTION,
            action: toolUse.input as ComputerAction,
          };

          await this.executeAction(toolUse as BetaToolUseBlock & ToolInput);

          yield {
            type: SSEEventType.ACTION_COMPLETED,
          };

          // Always take a screenshot after each action
          const screenshotData = await this.resolutionScaler.takeScreenshot();
          const screenshotBase64 =
            Buffer.from(screenshotData).toString("base64");

          const toolResultContent: BetaToolResultBlockParam["content"] = [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/png",
                data: screenshotBase64,
              },
            },
          ];

          const toolResult: BetaToolResultBlockParam = {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: toolResultContent,
            is_error: false,
          };

          toolResults.push(toolResult);
        }

        if (toolResults.length > 0) {
          const userMessage: BetaMessageParam = {
            role: "user",
            content: toolResults,
          };
          anthropicMessages.push(userMessage);
        }
      }
    } catch (error) {
      logError("ANTHROPIC_STREAMER", error);
      yield {
        type: SSEEventType.ERROR,
        content: "An error occurred with the AI service. Please try again.",
      };
    }
  }
}



================================================
FILE: lib/streaming/index.ts
================================================
import { Sandbox } from "@e2b/desktop";
import { SSEEvent, ActionResponse } from "@/types/api";
import { ResolutionScaler } from "./resolution";
import { logDebug } from "../logger";

export function formatSSE(event: SSEEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export interface ComputerInteractionStreamerFacadeStreamProps {
  signal: AbortSignal;
  messages: { role: "user" | "assistant"; content: string }[];
}

export abstract class ComputerInteractionStreamerFacade {
  abstract instructions: string;
  abstract desktop: Sandbox;
  abstract resolutionScaler: ResolutionScaler;

  abstract stream(
    props: ComputerInteractionStreamerFacadeStreamProps
  ): AsyncGenerator<SSEEvent>;

  // action type is specific to the streamer implementation
  abstract executeAction(action: unknown): Promise<ActionResponse | void>;
}

export function createStreamingResponse(
  generator: AsyncGenerator<SSEEvent>
): Response {
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of generator) {
        controller.enqueue(new TextEncoder().encode(formatSSE(chunk)));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}



================================================
FILE: lib/streaming/openai.ts
================================================
import { Sandbox } from "@e2b/desktop";
import OpenAI from "openai";
import { SSEEventType, SSEEvent } from "@/types/api";
import {
  ResponseComputerToolCall,
  ResponseInput,
  ResponseInputItem,
  Tool,
} from "openai/resources/responses/responses.mjs";
import {
  ComputerInteractionStreamerFacade,
  ComputerInteractionStreamerFacadeStreamProps,
} from "@/lib/streaming";
import { ActionResponse } from "@/types/api";
import { logDebug, logError, logWarning } from "../logger";
import { ResolutionScaler } from "./resolution";

const INSTRUCTIONS = `
You are Surf, a helpful assistant that can use a computer to help the user with their tasks.
You can use the computer to search the web, write code, and more.

Surf is built by E2B, which provides an open source isolated virtual computer in the cloud made for AI use cases.
This application integrates E2B's desktop sandbox with OpenAI's API to create an AI agent that can perform tasks
on a virtual computer through natural language instructions.

The screenshots that you receive are from a running sandbox instance, allowing you to see and interact with a real
virtual computer environment in real-time.

Since you are operating in a secure, isolated sandbox micro VM, you can execute most commands and operations without
worrying about security concerns. This environment is specifically designed for AI experimentation and task execution.

The sandbox is based on Ubuntu 22.04 and comes with many pre-installed applications including:
- Firefox browser
- Visual Studio Code
- LibreOffice suite
- Python 3 with common libraries
- Terminal with standard Linux utilities
- File manager (PCManFM)
- Text editor (Gedit)
- Calculator and other basic utilities

IMPORTANT: It is okay to run terminal commands at any point without confirmation, as long as they are required to fulfill the task the user has given. You should execute commands immediately when needed to complete the user's request efficiently.

IMPORTANT: When typing commands in the terminal, ALWAYS send a KEYPRESS ENTER action immediately after typing the command to execute it. Terminal commands will not run until you press Enter.

IMPORTANT: When editing files, prefer to use Visual Studio Code (VS Code) as it provides a better editing experience with syntax highlighting, code completion, and other helpful features.
`;

export class OpenAIComputerStreamer
  implements ComputerInteractionStreamerFacade
{
  public instructions: string;
  public desktop: Sandbox;
  public resolutionScaler: ResolutionScaler;

  private openai: OpenAI;

  constructor(desktop: Sandbox, resolutionScaler: ResolutionScaler) {
    this.desktop = desktop;
    this.resolutionScaler = resolutionScaler;
    this.openai = new OpenAI();
    this.instructions = INSTRUCTIONS;
  }

  async executeAction(
    action: ResponseComputerToolCall["action"]
  ): Promise<ActionResponse | void> {
    const desktop = this.desktop;

    switch (action.type) {
      case "screenshot": {
        break;
      }
      case "double_click": {
        const coordinate = this.resolutionScaler.scaleToOriginalSpace([
          action.x,
          action.y,
        ]);

        await desktop.doubleClick(coordinate[0], coordinate[1]);
        break;
      }
      case "click": {
        const coordinate = this.resolutionScaler.scaleToOriginalSpace([
          action.x,
          action.y,
        ]);

        if (action.button === "left") {
          await desktop.leftClick(coordinate[0], coordinate[1]);
        } else if (action.button === "right") {
          await desktop.rightClick(coordinate[0], coordinate[1]);
        } else if (action.button === "wheel") {
          await desktop.middleClick(coordinate[0], coordinate[1]);
        }
        break;
      }
      case "type": {
        await desktop.write(action.text);
        break;
      }
      case "keypress": {
        await desktop.press(action.keys);
        break;
      }
      case "move": {
        const coordinate = this.resolutionScaler.scaleToOriginalSpace([
          action.x,
          action.y,
        ]);

        await desktop.moveMouse(coordinate[0], coordinate[1]);
        break;
      }
      case "scroll": {
        if (action.scroll_y < 0) {
          await desktop.scroll("up", Math.abs(action.scroll_y));
        } else if (action.scroll_y > 0) {
          await desktop.scroll("down", action.scroll_y);
        }
        break;
      }
      case "wait": {
        break;
      }
      case "drag": {
        const startCoordinate = this.resolutionScaler.scaleToOriginalSpace([
          action.path[0].x,
          action.path[0].y,
        ]);

        const endCoordinate = this.resolutionScaler.scaleToOriginalSpace([
          action.path[1].x,
          action.path[1].y,
        ]);

        await desktop.drag(startCoordinate, endCoordinate);
        break;
      }
      default: {
        logWarning("Unknown action type:", action);
      }
    }
  }

  async *stream(
    props: ComputerInteractionStreamerFacadeStreamProps
  ): AsyncGenerator<SSEEvent<"openai">> {
    const { messages, signal } = props;

    try {
      const modelResolution = this.resolutionScaler.getScaledResolution();

      const computerTool: Tool = {
        // @ts-ignore
        type: "computer_use_preview",
        display_width: modelResolution[0],
        display_height: modelResolution[1],
        // @ts-ignore
        environment: "linux",
      };

      let response = await this.openai.responses.create({
        model: "computer-use-preview",
        tools: [computerTool],
        input: [...(messages as ResponseInput)],
        truncation: "auto",
        instructions: this.instructions,
        reasoning: {
          effort: "medium",
          generate_summary: "concise",
        },
      });

      while (true) {
        if (signal.aborted) {
          yield {
            type: SSEEventType.DONE,
            content: "Generation stopped by user",
          };
          break;
        }

        const computerCalls = response.output.filter(
          (item) => item.type === "computer_call"
        );

        if (computerCalls.length === 0) {
          yield {
            type: SSEEventType.REASONING,
            content: response.output_text,
          };
          yield {
            type: SSEEventType.DONE,
          };
          break;
        }

        const computerCall = computerCalls[0];
        const callId = computerCall.call_id;
        const action = computerCall.action;

        const reasoningItems = response.output.filter(
          (item) => item.type === "message" && "content" in item
        );

        if (reasoningItems.length > 0 && "content" in reasoningItems[0]) {
          const content = reasoningItems[0].content;

          // Log to debug why content is not a string
          logDebug("Reasoning content structure:", content);

          yield {
            type: SSEEventType.REASONING,
            content:
              reasoningItems[0].content[0].type === "output_text"
                ? reasoningItems[0].content[0].text
                : JSON.stringify(reasoningItems[0].content),
          };
        }

        yield {
          type: SSEEventType.ACTION,
          action,
        };

        await this.executeAction(action);

        yield {
          type: SSEEventType.ACTION_COMPLETED,
        };

        const newScreenshotData = await this.resolutionScaler.takeScreenshot();
        const newScreenshotBase64 =
          Buffer.from(newScreenshotData).toString("base64");

        const computerCallOutput: ResponseInputItem = {
          call_id: callId,
          type: "computer_call_output",
          output: {
            // @ts-ignore
            type: "input_image",
            image_url: `data:image/png;base64,${newScreenshotBase64}`,
          },
        };

        response = await this.openai.responses.create({
          model: "computer-use-preview",
          previous_response_id: response.id,
          instructions: this.instructions,
          tools: [computerTool],
          input: [computerCallOutput],
          truncation: "auto",
          reasoning: {
            effort: "medium",
            generate_summary: "concise",
          },
        });
      }
    } catch (error) {
      logError("OPENAI_STREAMER", error);
      if (error instanceof OpenAI.APIError && error.status === 429) {
        // since hitting rate limits is not expected, we optimistically assume we hit our quota limit (both have the same status code)
        yield {
          type: SSEEventType.ERROR,
          content:
            "Our usage quota ran out for this month. Please visit GitHub, self host the repository and use your own API keys to continue.",
        };
        yield {
          type: SSEEventType.DONE,
        };
        return;
      }
      yield {
        type: SSEEventType.ERROR,
        content: "An error occurred with the AI service. Please try again.",
      };
    }
  }
}



================================================
FILE: lib/streaming/resolution.test.ts
================================================
import { ResolutionScaler } from "./resolution";

// Mock Sandbox class for testing
class MockSandbox {
  async screenshot() {
    return Buffer.from("mock-screenshot");
  }
}

/**
 * Test suite for ResolutionScaler to diagnose issues with small targets on large resolutions
 */
async function runResolutionScalerTests() {
  console.log("=== ResolutionScaler Test Suite ===\n");

  // Test a range of resolutions from small to very large
  const testResolutions: Array<{ name: string; resolution: [number, number] }> =
    [
      { name: "Standard HD", resolution: [1280, 720] },
      { name: "Full HD", resolution: [1920, 1080] },
      { name: "2K", resolution: [2560, 1440] },
      { name: "4K", resolution: [3840, 2160] },
      { name: "5K", resolution: [5120, 2880] },
      { name: "Ultrawide", resolution: [3440, 1440] },
      { name: "Very Large Custom", resolution: [7680, 4320] }, // 8K
    ];

  // Small targets at different locations (absolute pixels)
  const smallTargets: Array<{
    name: string;
    position: [number, number];
    size: number;
  }> = [
    { name: "10px button near corner", position: [10, 10], size: 10 },
    { name: "5px icon near corner", position: [5, 5], size: 5 },
    { name: "3px dot near corner", position: [3, 3], size: 3 },
    { name: "1px pixel near corner", position: [1, 1], size: 1 },
  ];

  // Small targets at relative positions
  const createRelativeTargets = (resolution: [number, number]) => {
    return [
      {
        name: "Small target at 1% position",
        position: [
          Math.round(resolution[0] * 0.01),
          Math.round(resolution[1] * 0.01),
        ],
        size: Math.max(
          1,
          Math.round(Math.min(resolution[0], resolution[1]) * 0.005)
        ),
      },
      {
        name: "Small target at 5% position",
        position: [
          Math.round(resolution[0] * 0.05),
          Math.round(resolution[1] * 0.05),
        ],
        size: Math.max(
          1,
          Math.round(Math.min(resolution[0], resolution[1]) * 0.01)
        ),
      },
      {
        name: "Tiny target at center",
        position: [
          Math.round(resolution[0] * 0.5),
          Math.round(resolution[1] * 0.5),
        ],
        size: 3,
      },
    ];
  };

  // Run tests for each resolution
  for (const { name, resolution } of testResolutions) {
    console.log(
      `\n\n🔍 Testing ${name} resolution: ${resolution[0]}x${resolution[1]}`
    );

    // Create scaler with mock sandbox
    const mockSandbox = new MockSandbox() as any;
    const scaler = new ResolutionScaler(mockSandbox, resolution);

    // Log resolution details
    console.log(`Original: ${resolution[0]}x${resolution[1]}`);
    console.log(
      `Scaled: ${scaler.getScaledResolution()[0]}x${
        scaler.getScaledResolution()[1]
      }`
    );
    console.log(`Scale factor: ${scaler.getScaleFactor().toFixed(6)}`);

    // Test absolute small targets
    console.log("\n--- Testing Fixed Small Targets ---");
    testTargets(scaler, smallTargets);

    // Test relative small targets specific to this resolution
    console.log("\n--- Testing Relative Small Targets ---");
    testTargets(scaler, createRelativeTargets(resolution));

    // Test for systematic bias in rounding
    console.log("\n--- Testing for Systematic Rounding Bias ---");
    testRoundingBias(scaler);

    // Test a grid of points to look for patterns in errors
    console.log("\n--- Testing Coordinate Grid for Error Patterns ---");
    testCoordinateGrid(scaler);
  }

  // Special test case for the original reported issue
  console.log("\n\n🐞 Detailed Analysis of Small Target Edge Cases");
  testSmallTargetEdgeCases();
}

/**
 * Test a set of targets for coordinate mapping accuracy
 */
function testTargets(
  scaler: ResolutionScaler,
  targets: Array<{ name: string; position: [number, number]; size: number }>
) {
  for (const { name, position, size } of targets) {
    // Test center of target
    const result = scaler.testCoordinateRoundTrip(position);

    console.log(
      `\nTarget: ${name} at [${position[0]}, ${position[1]}] with size ${size}px`
    );

    // Calculate if the error would cause a miss
    const errorMagnitude = Math.sqrt(
      result.error[0] ** 2 + result.error[1] ** 2
    );
    const wouldMiss = errorMagnitude > size / 2;

    console.log(
      `  Model space: [${result.modelSpace[0]}, ${result.modelSpace[1]}]`
    );
    console.log(
      `  Round trip: [${result.roundTrip[0]}, ${result.roundTrip[1]}]`
    );
    console.log(
      `  Error: [${result.error[0]}, ${
        result.error[1]
      }] (${errorMagnitude.toFixed(2)} pixels)`
    );
    console.log(`  Would miss target? ${wouldMiss ? "❌ YES" : "✅ NO"}`);

    // Test all corners of the target to see if any part would be hit
    const corners = [
      [position[0] - size / 2, position[1] - size / 2],
      [position[0] + size / 2, position[1] - size / 2],
      [position[0] - size / 2, position[1] + size / 2],
      [position[0] + size / 2, position[1] + size / 2],
    ];

    let anyCornerHit = false;
    for (const corner of corners) {
      const cornerResult = scaler.testCoordinateRoundTrip([
        Math.round(corner[0]),
        Math.round(corner[1]),
      ]);
      const distance = Math.sqrt(
        (cornerResult.roundTrip[0] - position[0]) ** 2 +
          (cornerResult.roundTrip[1] - position[1]) ** 2
      );
      if (distance <= size / 2) {
        anyCornerHit = true;
        break;
      }
    }

    if (!anyCornerHit && wouldMiss) {
      console.log(`  ⚠️ CRITICAL: Target completely missed in mapping!`);
    }
  }
}

/**
 * Test for systematic rounding bias by checking many coordinate pairs
 */
function testRoundingBias(scaler: ResolutionScaler) {
  const original = scaler.getOriginalResolution();
  const samples = 100;

  const xErrors = [];
  const yErrors = [];

  // Generate random coordinates across the screen
  for (let i = 0; i < samples; i++) {
    const x = Math.floor(Math.random() * original[0]);
    const y = Math.floor(Math.random() * original[1]);

    const result = scaler.testCoordinateRoundTrip([x, y]);
    xErrors.push(result.error[0]);
    yErrors.push(result.error[1]);
  }

  // Calculate bias metrics
  const xAvgError = xErrors.reduce((sum, val) => sum + val, 0) / samples;
  const yAvgError = yErrors.reduce((sum, val) => sum + val, 0) / samples;

  const xAbsError =
    xErrors.reduce((sum, val) => sum + Math.abs(val), 0) / samples;
  const yAbsError =
    yErrors.reduce((sum, val) => sum + Math.abs(val), 0) / samples;

  console.log(
    `X bias: ${xAvgError.toFixed(4)} (avg error: ${xAbsError.toFixed(
      4
    )} pixels)`
  );
  console.log(
    `Y bias: ${yAvgError.toFixed(4)} (avg error: ${yAbsError.toFixed(
      4
    )} pixels)`
  );

  if (Math.abs(xAvgError) > 0.1 || Math.abs(yAvgError) > 0.1) {
    console.log(
      `  ⚠️ Significant systematic bias detected in coordinate mapping!`
    );
  }
}

/**
 * Test a grid of points to look for patterns in the errors
 */
function testCoordinateGrid(scaler: ResolutionScaler) {
  const original = scaler.getOriginalResolution();
  const gridSize = 10; // 10x10 grid

  let maxError = 0;
  let maxErrorLocation: [number, number] = [0, 0];

  // Sweep through grid points
  for (let xPercent = 0; xPercent <= 100; xPercent += 100 / gridSize) {
    for (let yPercent = 0; yPercent <= 100; yPercent += 100 / gridSize) {
      const x = Math.round((xPercent / 100) * (original[0] - 1));
      const y = Math.round((yPercent / 100) * (original[1] - 1));

      const result = scaler.testCoordinateRoundTrip([x, y]);
      const errorMagnitude = Math.sqrt(
        result.error[0] ** 2 + result.error[1] ** 2
      );

      if (errorMagnitude > maxError) {
        maxError = errorMagnitude;
        maxErrorLocation = [x, y];
      }
    }
  }

  console.log(
    `Maximum error: ${maxError.toFixed(2)} pixels at position [${
      maxErrorLocation[0]
    }, ${maxErrorLocation[1]}]`
  );

  // Test specific error patterns near edges
  console.log("\nTesting edge areas for increased errors:");

  // Test very near edges (first/last few pixels)
  const edgePoints = [
    [0, 0],
    [1, 0],
    [2, 0], // Top-left
    [original[0] - 1, 0],
    [original[0] - 2, 0], // Top-right
    [0, original[1] - 1],
    [0, original[1] - 2], // Bottom-left
    [original[0] - 1, original[1] - 1], // Bottom-right
  ];

  for (const point of edgePoints) {
    const result = scaler.testCoordinateRoundTrip(point);
    const errorMagnitude = Math.sqrt(
      result.error[0] ** 2 + result.error[1] ** 2
    );

    console.log(
      `Edge point [${point[0]}, ${point[1]}] error: ${errorMagnitude.toFixed(
        2
      )} pixels`
    );
  }
}

/**
 * Special test case focused on the edge case that might be causing the reported issue
 */
function testSmallTargetEdgeCases() {
  // Create a set of problematic scenarios to test
  const scenarios = [
    {
      name: "4K with tiny target",
      resolution: [3840, 2160],
      targets: [
        { name: "1px dot", position: [10, 10], size: 1 },
        { name: "2px dot", position: [20, 20], size: 2 },
        { name: "3px dot", position: [30, 30], size: 3 },
      ],
    },
    {
      name: "5K with sub-pixel rounding test",
      resolution: [5120, 2880],
      targets: Array.from({ length: 10 }, (_, i) => ({
        name: `Point ${i + 1}`,
        position: [i * 10 + 5, i * 10 + 5],
        size: 3,
      })),
    },
    {
      name: "Fractional scale factor test",
      resolution: [2560, 1600], // Likely to produce fractional scale factor
      targets: Array.from({ length: 10 }, (_, i) => ({
        name: `Point ${i + 1}`,
        position: [Math.floor((2560 * i) / 10), Math.floor((1600 * i) / 10)],
        size: 5,
      })),
    },
  ];

  // Run detailed test on each scenario
  for (const scenario of scenarios) {
    console.log(`\n=== ${scenario.name} ===`);
    const mockSandbox = new MockSandbox() as any;
    const scaler = new ResolutionScaler(mockSandbox, scenario.resolution);

    console.log(
      `Resolution: ${scenario.resolution[0]}x${scenario.resolution[1]}`
    );
    console.log(
      `Scaled to: ${scaler.getScaledResolution()[0]}x${
        scaler.getScaledResolution()[1]
      }`
    );
    console.log(`Scale factor: ${scaler.getScaleFactor().toFixed(6)}`);

    // Analyze exact vs. rounded scale factors
    const originalResolution = scenario.resolution;
    const scaledResolution = scaler.getScaledResolution();

    const exactXScaleFactor = scaledResolution[0] / originalResolution[0];
    const exactYScaleFactor = scaledResolution[1] / originalResolution[1];
    const actualScaleFactor = scaler.getScaleFactor();

    console.log(`\nExact X scale factor: ${exactXScaleFactor.toFixed(6)}`);
    console.log(`Exact Y scale factor: ${exactYScaleFactor.toFixed(6)}`);
    console.log(`Actual unified scale factor: ${actualScaleFactor.toFixed(6)}`);

    if (Math.abs(exactXScaleFactor - exactYScaleFactor) > 0.001) {
      console.log(
        `⚠️ Potential issue: X and Y scale factors differ significantly!`
      );
    }

    if (
      Math.abs(exactXScaleFactor - actualScaleFactor) > 0.001 ||
      Math.abs(exactYScaleFactor - actualScaleFactor) > 0.001
    ) {
      console.log(
        `⚠️ Potential issue: Actual scale factor differs from coordinate ratios!`
      );
    }

    // Detailed analysis of target accuracy with round-tripping
    console.log("\n--- Detailed Target Analysis ---");
    for (const target of scenario.targets) {
      const originalPoint = target.position;

      // Manual calculation to show exact math
      const manualToModelX = originalPoint[0] * actualScaleFactor;
      const manualToModelY = originalPoint[1] * actualScaleFactor;

      const roundedModelX = Math.round(manualToModelX);
      const roundedModelY = Math.round(manualToModelY);

      const manualBackToOriginalX = roundedModelX / actualScaleFactor;
      const manualBackToOriginalY = roundedModelY / actualScaleFactor;

      const finalRoundedX = Math.round(manualBackToOriginalX);
      const finalRoundedY = Math.round(manualBackToOriginalY);

      // Get results from the scaler for comparison
      const modelCoords = scaler.scaleToModelSpace(originalPoint);
      const roundTrip = scaler.scaleToOriginalSpace(modelCoords);

      console.log(
        `\nTarget: "${target.name}" at [${originalPoint[0]}, ${originalPoint[1]}]:`
      );
      console.log(
        `  Exact model coords: [${manualToModelX.toFixed(
          3
        )}, ${manualToModelY.toFixed(3)}]`
      );
      console.log(
        `  Rounded model coords: [${roundedModelX}, ${roundedModelY}]`
      );
      console.log(
        `  Scaler model coords: [${modelCoords[0]}, ${modelCoords[1]}]`
      );

      if (
        roundedModelX !== modelCoords[0] ||
        roundedModelY !== modelCoords[1]
      ) {
        console.log(
          `  ⚠️ Model coordinate calculation differs from manual calculation!`
        );
      }

      console.log(
        `  Exact reverse transform: [${manualBackToOriginalX.toFixed(
          3
        )}, ${manualBackToOriginalY.toFixed(3)}]`
      );
      console.log(
        `  Final rounded coords: [${finalRoundedX}, ${finalRoundedY}]`
      );
      console.log(`  Scaler round-trip: [${roundTrip[0]}, ${roundTrip[1]}]`);

      if (finalRoundedX !== roundTrip[0] || finalRoundedY !== roundTrip[1]) {
        console.log(
          `  ⚠️ Round-trip calculation differs from manual calculation!`
        );
      }

      // Calculate error and check if target would be hit
      const error = [
        roundTrip[0] - originalPoint[0],
        roundTrip[1] - originalPoint[1],
      ];
      const errorMagnitude = Math.sqrt(error[0] ** 2 + error[1] ** 2);

      console.log(`  Error vector: [${error[0]}, ${error[1]}]`);
      console.log(`  Error magnitude: ${errorMagnitude.toFixed(2)} pixels`);
      console.log(
        `  Target hit? ${
          errorMagnitude <= target.size / 2 ? "✅ YES" : "❌ NO"
        }`
      );

      // Subpixel analysis
      const subpixelLossX = Math.abs(manualToModelX - roundedModelX);
      const subpixelLossY = Math.abs(manualToModelY - roundedModelY);

      console.log(
        `  Subpixel rounding loss: [${subpixelLossX.toFixed(
          3
        )}, ${subpixelLossY.toFixed(3)}]`
      );

      if (subpixelLossX > 0.4 || subpixelLossY > 0.4) {
        console.log(`  ⚠️ High subpixel rounding loss detected!`);
      }
    }
  }

  // Suggest potential fixes
  console.log("\n\n=== Potential Issues and Fixes ===");
  console.log(
    "1. Scale factor calculation may not preserve small targets when using geometric mean"
  );
  console.log(
    "   → Consider using min(xScale, yScale) to ensure coordinates are never rounded beyond target"
  );
  console.log(
    "2. Double rounding during coordinate transforms may compound errors"
  );
  console.log("   → Store intermediate calculations with higher precision");
  console.log(
    "3. For small targets, the transformation bias may consistently miss in one direction"
  );
  console.log(
    "   → Add small bias correction for tiny targets or use ceiling/floor instead of round"
  );
}

// Run the tests
runResolutionScalerTests().catch(console.error);



================================================
FILE: lib/streaming/resolution.ts
================================================
import { Sandbox } from "@e2b/desktop";
import {
  MAX_RESOLUTION_WIDTH,
  MAX_RESOLUTION_HEIGHT,
  MIN_RESOLUTION_WIDTH,
  MIN_RESOLUTION_HEIGHT,
} from "@/lib/config";
import sharp from "sharp";

/**
 * ResolutionScaler handles resolution scaling between the original desktop
 * resolution and the scaled model resolution, including coordinate transformations
 * and screenshot scaling.
 *
 * This class maintains aspect ratio consistency while ensuring the resolution
 * stays within configured boundaries, providing accurate coordinate mapping
 * between different resolution spaces.
 */
export class ResolutionScaler {
  // Private properties
  private desktop: Sandbox;
  private originalResolution: [number, number];
  private scaledResolution: [number, number];
  private scaleFactor: number;
  private originalAspectRatio: number;
  private scaledAspectRatio: number;

  /**
   * Creates a new ResolutionScaler
   *
   * @param desktop - The sandbox instance used for taking screenshots
   * @param originalResolution - The original desktop resolution [width, height]
   */
  constructor(desktop: Sandbox, originalResolution: [number, number]) {
    this.desktop = desktop;
    this.originalResolution = originalResolution;
    this.originalAspectRatio = originalResolution[0] / originalResolution[1];

    // Calculate scaled resolution and scale factor immediately on instantiation
    const { scaledResolution, scaleFactor } =
      this.calculateScaledResolution(originalResolution);
    this.scaledResolution = scaledResolution;
    this.scaleFactor = scaleFactor;
    this.scaledAspectRatio = scaledResolution[0] / scaledResolution[1];

    // Validate coordinate scaling accuracy
    this.validateCoordinateScaling();
  }

  /**
   * Get the original desktop resolution
   *
   * @returns The original resolution as [width, height]
   */
  public getOriginalResolution(): [number, number] {
    return this.originalResolution;
  }

  /**
   * Get the scaled resolution used for model interactions
   *
   * @returns The scaled resolution as [width, height]
   */
  public getScaledResolution(): [number, number] {
    return this.scaledResolution;
  }

  /**
   * Get the scale factor between original and scaled resolutions
   *
   * @returns The scale factor
   */
  public getScaleFactor(): number {
    return this.scaleFactor;
  }

  /**
   * Get the aspect ratio of the original resolution
   *
   * @returns The original aspect ratio (width/height)
   */
  public getOriginalAspectRatio(): number {
    return this.originalAspectRatio;
  }

  /**
   * Get the aspect ratio of the scaled resolution
   *
   * @returns The scaled aspect ratio (width/height)
   */
  public getScaledAspectRatio(): number {
    return this.scaledAspectRatio;
  }

  /**
   * Validates coordinate scaling functions by performing round-trip tests
   * on several key positions across the screen
   */
  private validateCoordinateScaling(): void {
    // Test points at corners, center, and edges
    const testPoints: Array<{ name: string; point: [number, number] }> = [
      { name: "Top-left corner", point: [0, 0] },
      { name: "Top-right corner", point: [this.originalResolution[0] - 1, 0] },
      {
        name: "Bottom-left corner",
        point: [0, this.originalResolution[1] - 1],
      },
      {
        name: "Bottom-right corner",
        point: [this.originalResolution[0] - 1, this.originalResolution[1] - 1],
      },
      {
        name: "Center",
        point: [
          Math.floor(this.originalResolution[0] / 2),
          Math.floor(this.originalResolution[1] / 2),
        ],
      },
      { name: "Small target (10px)", point: [10, 10] }, // Small target test
    ];

    for (const { point } of testPoints) {
      this.testCoordinateRoundTrip(point);
    }
  }

  /**
   * Converts coordinates from model space to original desktop space.
   * Use this when the model sends coordinates (based on scaled screenshot)
   * that need to be converted to the original desktop space for actual interaction.
   *
   * @param coordinate - Coordinates in model's scaled space [x, y]
   * @returns Coordinates in original desktop space [x, y]
   */
  public scaleToOriginalSpace(coordinate: [number, number]): [number, number] {
    // Store the exact scaled values before rounding
    const exactScaledX = coordinate[0] / this.scaleFactor;
    const exactScaledY = coordinate[1] / this.scaleFactor;

    // Round only at the final step for pixel-perfect positioning
    const finalX = Math.round(exactScaledX);
    const finalY = Math.round(exactScaledY);

    return [finalX, finalY];
  }

  /**
   * Converts coordinates from original desktop space to model space.
   * Use this when desktop coordinates need to be represented in the model's scaled space.
   *
   * @param coordinate - Coordinates in original desktop space [x, y]
   * @returns Coordinates in model's scaled space [x, y]
   */
  public scaleToModelSpace(coordinate: [number, number]): [number, number] {
    // Store the exact scaled values before rounding
    const exactScaledX = coordinate[0] * this.scaleFactor;
    const exactScaledY = coordinate[1] * this.scaleFactor;

    // Round only at the final step for pixel-perfect representation
    const finalX = Math.round(exactScaledX);
    const finalY = Math.round(exactScaledY);

    return [finalX, finalY];
  }

  /**
   * Tests the round-trip accuracy of coordinate scaling.
   * Helps identify potential precision issues with coordinate transformations.
   *
   * @param originalCoordinate - A coordinate in original space to test
   * @returns Object containing the original, model space, and round-trip coordinates with error
   */
  public testCoordinateRoundTrip(originalCoordinate: [number, number]): {
    original: [number, number];
    modelSpace: [number, number];
    roundTrip: [number, number];
    error: [number, number];
  } {
    const modelSpace = this.scaleToModelSpace(originalCoordinate);
    const roundTrip = this.scaleToOriginalSpace(modelSpace);

    const error: [number, number] = [
      roundTrip[0] - originalCoordinate[0],
      roundTrip[1] - originalCoordinate[1],
    ];

    return { original: originalCoordinate, modelSpace, roundTrip, error };
  }

  /**
   * Takes a screenshot at the scaled resolution suitable for model consumption.
   * The screenshot is automatically scaled to the target resolution while
   * preserving aspect ratio.
   *
   * @returns A buffer containing the scaled screenshot
   */
  public async takeScreenshot(): Promise<Buffer> {
    // Take the original screenshot
    const originalScreenshot = await this.desktop.screenshot();

    // If no scaling is needed, return the original
    if (this.scaleFactor === 1) {
      return Buffer.from(originalScreenshot);
    }

    // Scale the screenshot - use high quality settings for better small target visibility
    const scaledScreenshot = await this.scaleScreenshot(
      originalScreenshot,
      this.scaledResolution
    );

    return scaledScreenshot;
  }

  /**
   * Calculates a scaled resolution that maintains aspect ratio and fits within boundaries.
   * This ensures the resolution stays within MIN and MAX resolution constraints.
   *
   * @param originalResolution - The original resolution to scale
   * @returns The scaled resolution and scale factor
   */
  private calculateScaledResolution(originalResolution: [number, number]): {
    scaledResolution: [number, number];
    scaleFactor: number;
  } {
    const [width, height] = originalResolution;
    const originalAspectRatio = width / height;

    // If resolution is already within bounds, return it as is
    if (
      width <= MAX_RESOLUTION_WIDTH &&
      width >= MIN_RESOLUTION_WIDTH &&
      height <= MAX_RESOLUTION_HEIGHT &&
      height >= MIN_RESOLUTION_HEIGHT
    ) {
      return {
        scaledResolution: [width, height],
        scaleFactor: 1,
      };
    }

    // Calculate scale factors for width and height
    let widthScaleFactor = 1;
    if (width > MAX_RESOLUTION_WIDTH) {
      widthScaleFactor = MAX_RESOLUTION_WIDTH / width;
    } else if (width < MIN_RESOLUTION_WIDTH) {
      widthScaleFactor = MIN_RESOLUTION_WIDTH / width;
    }

    let heightScaleFactor = 1;
    if (height > MAX_RESOLUTION_HEIGHT) {
      heightScaleFactor = MAX_RESOLUTION_HEIGHT / height;
    } else if (height < MIN_RESOLUTION_HEIGHT) {
      heightScaleFactor = MIN_RESOLUTION_HEIGHT / height;
    }

    // Use the appropriate scale factor to ensure both dimensions are within bounds
    let scaleFactor;
    if (widthScaleFactor < 1 || heightScaleFactor < 1) {
      // We need to scale down, use the smaller factor
      scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);
    } else {
      // We need to scale up, use the larger factor
      scaleFactor = Math.max(widthScaleFactor, heightScaleFactor);
    }

    // Calculate new dimensions - store exact values before rounding
    const exactScaledWidth = width * scaleFactor;
    const exactScaledHeight = height * scaleFactor;

    // Round to integer pixels at the final step
    const scaledWidth = Math.round(exactScaledWidth);
    const scaledHeight = Math.round(exactScaledHeight);

    // Recalculate the final scale factor based on the rounded dimensions
    // This ensures more accurate coordinate scaling when using these dimensions
    const finalWidthScaleFactor = scaledWidth / width;
    const finalHeightScaleFactor = scaledHeight / height;

    // Using geometric mean for scale factor to better preserve aspect ratio
    const finalScaleFactor = Math.sqrt(
      finalWidthScaleFactor * finalHeightScaleFactor
    );

    return {
      scaledResolution: [scaledWidth, scaledHeight],
      scaleFactor: finalScaleFactor,
    };
  }

  /**
   * Scales a screenshot to the specified resolution.
   * Uses high-quality scaling to preserve UI details.
   *
   * @param screenshot - The original screenshot buffer
   * @param targetResolution - The target resolution to scale to [width, height]
   * @returns A buffer containing the scaled screenshot
   */
  private async scaleScreenshot(
    screenshot: Buffer | Uint8Array,
    targetResolution: [number, number]
  ): Promise<Buffer> {
    const [width, height] = targetResolution;

    try {
      // Use higher quality settings to preserve small UI elements better
      const result = await sharp(screenshot)
        .resize(width, height, {
          fit: "fill",
          kernel: "lanczos3", // Higher quality resampling kernel
          fastShrinkOnLoad: false, // Disable fast shrink for higher quality
        })
        .toBuffer();

      return result;
    } catch (error) {
      // Return original if scaling fails, ensuring it's a Buffer
      return Buffer.from(screenshot);
    }
  }
}






================================================
FILE: types/anthropic.ts
================================================
/**
 * Type definitions for Anthropic-related functionality
 */
import {
  BetaMessageParam,
  BetaToolResultBlockParam,
  BetaToolUseBlock,
} from "@anthropic-ai/sdk/resources/beta/messages/messages.mjs";

type Coordinate = [number, number];

interface ComputerActionBase {
  action: string;
}

interface KeyAction extends ComputerActionBase {
  action: "key";
  text: string;
}

interface HoldKeyAction extends ComputerActionBase {
  action: "hold_key";
  text: string;
  duration: number;
}

interface TypeAction extends ComputerActionBase {
  action: "type";
  text: string;
}

interface CursorPositionAction extends ComputerActionBase {
  action: "cursor_position";
}

interface MouseMoveAction extends ComputerActionBase {
  action: "mouse_move";
  coordinate: Coordinate;
}

interface LeftMouseDownAction extends ComputerActionBase {
  action: "left_mouse_down";
}

interface LeftMouseUpAction extends ComputerActionBase {
  action: "left_mouse_up";
}

interface LeftClickAction extends ComputerActionBase {
  action: "left_click";
  coordinate: Coordinate;
  text?: string;
}

interface LeftClickDragAction extends ComputerActionBase {
  action: "left_click_drag";
  start_coordinate: Coordinate;
  coordinate: Coordinate;
}

interface RightClickAction extends ComputerActionBase {
  action: "right_click";
  coordinate: Coordinate;
  text?: string;
}

interface MiddleClickAction extends ComputerActionBase {
  action: "middle_click";
  coordinate: Coordinate;
  text?: string;
}

interface DoubleClickAction extends ComputerActionBase {
  action: "double_click";
  coordinate: Coordinate;
  text?: string;
}

interface TripleClickAction extends ComputerActionBase {
  action: "triple_click";
  coordinate: Coordinate;
  text?: string;
}

interface ScrollAction extends ComputerActionBase {
  action: "scroll";
  coordinate: Coordinate;
  scroll_direction: "up" | "down" | "left" | "right";
  scroll_amount: number;
  text?: string;
}

interface WaitAction extends ComputerActionBase {
  action: "wait";
  duration: number;
}

interface ScreenshotAction extends ComputerActionBase {
  action: "screenshot";
}

export type ComputerAction =
  | KeyAction
  | HoldKeyAction
  | TypeAction
  | CursorPositionAction
  | MouseMoveAction
  | LeftMouseDownAction
  | LeftMouseUpAction
  | LeftClickAction
  | LeftClickDragAction
  | RightClickAction
  | MiddleClickAction
  | DoubleClickAction
  | TripleClickAction
  | ScrollAction
  | WaitAction
  | ScreenshotAction;

interface TextEditorCommandBase {
  command: string;
  path: string;
}

interface ViewCommand extends TextEditorCommandBase {
  command: "view";
  view_range?: [number, number];
}

interface CreateCommand extends TextEditorCommandBase {
  command: "create";
  file_text: string;
}

interface StrReplaceCommand extends TextEditorCommandBase {
  command: "str_replace";
  old_str: string;
  new_str?: string;
}

interface InsertCommand extends TextEditorCommandBase {
  command: "insert";
  insert_line: number;
  new_str: string;
}

interface UndoEditCommand extends TextEditorCommandBase {
  command: "undo_edit";
}

export type TextEditorCommand =
  | ViewCommand
  | CreateCommand
  | StrReplaceCommand
  | InsertCommand
  | UndoEditCommand;

export type BashCommand =
  | {
      command: string;
      restart?: never;
    }
  | {
      command?: never;
      restart: true;
    };

export type ToolInput =
  | { name: "computer"; input: ComputerAction }
  | { name: "str_replace_editor"; input: TextEditorCommand }
  | { name: "bash"; input: BashCommand };



================================================
FILE: types/api.ts
================================================
/**
 * Type definitions for Surf Computer API and SSE events
 */
import { ComputerAction } from "@/types/anthropic";
import { ResponseComputerToolCall } from "openai/resources/responses/responses.mjs";

/**
 * Model types supported by Surf
 */
export type ComputerModel = "openai" | "anthropic";

/**
 * SSE event types for client communication
 */
export enum SSEEventType {
  UPDATE = "update",
  ACTION = "action",
  REASONING = "reasoning",
  DONE = "done",
  ERROR = "error",
  SANDBOX_CREATED = "sandbox_created",
  ACTION_COMPLETED = "action_completed",
}

/**
 * Base interface for all SSE events
 */
export interface BaseSSEEvent {
  type: SSEEventType;
}

/**
 * Action event with details about computer action being performed
 */
export interface ActionEvent<T extends ComputerModel> extends BaseSSEEvent {
  type: SSEEventType.ACTION;
  action: T extends "openai"
    ? ResponseComputerToolCall["action"]
    : ComputerAction;
}

/**
 * Reasoning event with AI's explanation for an action
 */
export interface ReasoningEvent extends BaseSSEEvent {
  type: SSEEventType.REASONING;
  content: string;
}

/**
 * Done event indicating completion
 */
export interface DoneEvent extends BaseSSEEvent {
  type: SSEEventType.DONE;
  content?: string; // Final OpenAI response output
}

/**
 * Error event with error details
 */
export interface ErrorEvent extends BaseSSEEvent {
  type: SSEEventType.ERROR;
  content: string;
}

/**
 * Sandbox created event with sandbox details
 */
export interface SandboxCreatedEvent extends BaseSSEEvent {
  type: SSEEventType.SANDBOX_CREATED;
  sandboxId: string;
  vncUrl: string;
}

/**
 * Action completed event with details about the completed action
 */
export interface ActionCompletedEvent extends BaseSSEEvent {
  type: SSEEventType.ACTION_COMPLETED;
}

/**
 * Union type of all possible SSE events
 */
export type SSEEvent<T extends ComputerModel = ComputerModel> =
  | ActionEvent<T>
  | ReasoningEvent
  | DoneEvent
  | ErrorEvent
  | SandboxCreatedEvent
  | ActionCompletedEvent;

/**
 * Response from action execution
 */
export type ActionResponse = {
  action: string;
  data: {
    type: "computer_screenshot";
    image_url: string;
  };
};

/**
 * Helper function to sleep for a specified duration
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



================================================
FILE: types/chat.ts
================================================
/**
 * Type definitions for chat messages and related functionality
 */
import { ResponseComputerToolCall } from "openai/resources/responses/responses.mjs";
import { ActionEvent, ComputerModel, SSEEventType } from "./api";
import { ComputerAction } from "@/types/anthropic";

/**
 * Role of a chat message
 */
export type MessageRole = "user" | "assistant" | "system" | "action";

/**
 * Base interface for all chat messages
 */
export interface BaseChatMessage {
  id: string;
  role: MessageRole;
}

/**
 * User message in the chat
 */
export interface UserChatMessage extends BaseChatMessage {
  role: "user";
  content: string;
}

/**
 * Assistant message in the chat
 */
export interface AssistantChatMessage extends BaseChatMessage {
  role: "assistant";
  content: string;
  model: ComputerModel;
}

/**
 * System message in the chat
 */
export interface SystemChatMessage extends BaseChatMessage {
  role: "system";
  content: string;
  isError?: boolean;
}

/**
 * Action message in the chat
 */
export interface ActionChatMessage<T extends ComputerModel = ComputerModel>
  extends BaseChatMessage {
  role: "action";
  action: T extends "openai"
    ? ResponseComputerToolCall["action"]
    : ComputerAction;
  status?: "pending" | "completed" | "failed";
  model: ComputerModel;
}

/**
 * Union type for all chat messages
 */
export type ChatMessage<T extends ComputerModel = "openai"> =
  | UserChatMessage
  | AssistantChatMessage
  | SystemChatMessage
  | ActionChatMessage<T>;

/**
 * Chat state interface
 */
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Parsed SSE event from the server
 */
export interface ParsedSSEEvent<T extends ComputerModel> {
  type: SSEEventType;
  content?: any;
  action?: ActionEvent<T>["action"];
  callId?: string;
  sandboxId?: string;
  vncUrl?: string;
}

/**
 * Chat API request parameters
 */
export interface ChatApiRequest {
  messages: { role: MessageRole; content: string }[];
  sandboxId?: string;
  environment?: string;
  resolution: [number, number];
  model?: ComputerModel;
}

/**
 * Options for sending a message
 */
export interface SendMessageOptions {
  content: string;
  sandboxId?: string;
  environment?: string;
  resolution: [number, number];
  model?: ComputerModel;
}


