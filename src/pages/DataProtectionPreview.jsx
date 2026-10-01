import React, { useState } from "react";
import { Laptop, Tablet, Smartphone, Maximize2, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function DataProtectionPreview() {
  const [viewMode, setViewMode] = useState("responsive"); // 'laptop', 'tablet', 'mobile', 'responsive'
  const [activeModule, setActiveModule] = useState("privacy_consent"); // 'privacy_consent' | 'data_protection_encryption'
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-sans">
      {/* Top Device & Module Switcher Header */}
      <header className="min-h-[60px] bg-[#1E293B] border-b border-slate-700/80 px-3 sm:px-6 py-2 sm:py-0 flex flex-wrap items-center justify-between gap-3 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          {/* Module Switcher Buttons */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/60">
            <button
              type="button"
              onClick={() => setActiveModule("privacy_consent")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeModule === "privacy_consent"
                  ? "bg-[#4866F6] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Privacy &amp; Consent</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule("data_deletion_request")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeModule === "data_deletion_request"
                  ? "bg-[#4866F6] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Data Deletion</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule("data_protection_encryption")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeModule === "data_protection_encryption"
                  ? "bg-[#4866F6] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Data Protection</span>
            </button>
          </div>
        </div>

        {/* Viewport Mode Buttons */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            type="button"
            onClick={() => setViewMode("laptop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              viewMode === "laptop"
                ? "bg-[#4866F6] text-white shadow-md shadow-blue-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Laptop View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              viewMode === "tablet"
                ? "bg-[#4866F6] text-white shadow-md shadow-blue-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tab View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              viewMode === "mobile"
                ? "bg-[#4866F6] text-white shadow-md shadow-blue-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("responsive")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              viewMode === "responsive"
                ? "bg-[#4866F6] text-white shadow-md shadow-blue-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Responsive</span>
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 bg-[#1E293B]/40 flex items-center justify-center p-2 sm:p-6 overflow-auto">
        {/* 1. Live Responsive Mode */}
        {viewMode === "responsive" && (
          <div className="w-full h-[calc(100vh-60px)] bg-white overflow-hidden shadow-2xl">
            <Dashboard key={`${activeModule}-responsive`} defaultItem={activeModule} />
          </div>
        )}

        {/* 2. Laptop Frame (1024px simulated) */}
        {viewMode === "laptop" && (
          <div className="w-[1024px] max-w-full h-[800px] bg-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Window bar */}
            <div className="h-7 bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-4 text-[11px] text-slate-500 font-mono">
                {activeModule === "privacy_consent"
                  ? "Privacy & Consent"
                  : activeModule === "data_deletion_request"
                  ? "Data Deletion Requests"
                  : "Data Protection & Encryption"}{" "}
                — Laptop View (1024px)
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <Dashboard key={`${activeModule}-laptop`} defaultItem={activeModule} />
            </div>
          </div>
        )}

        {/* 3. Tablet Frame (768px simulated) */}
        {viewMode === "tablet" && (
          <div className="w-[768px] h-[860px] bg-white rounded-2xl shadow-2xl border-4 border-slate-700 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Tablet top bar */}
            <div className="h-6 bg-slate-800 flex items-center justify-center relative">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
            </div>
            <div className="flex-1 overflow-hidden bg-[#F8FAFC]">
              <Dashboard key={`${activeModule}-tablet`} defaultItem={activeModule} />
            </div>
          </div>
        )}

        {/* 4. Mobile Frame (390px simulated) */}
        {viewMode === "mobile" && (
          <div className="w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl border-[10px] border-slate-800 overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            {/* Dynamic Island / Notch */}
            <div className="h-8 bg-slate-900 flex items-center justify-center relative shrink-0">
              <div className="w-24 h-4 bg-black rounded-full" />
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F8FAFC]">
              <Dashboard key={`${activeModule}-mobile`} defaultItem={activeModule} />
            </div>
            {/* Home indicator */}
            <div className="h-5 bg-white flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
