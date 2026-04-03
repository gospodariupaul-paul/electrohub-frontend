"use client";

interface Props {
  status: string;
}

export default function OrderTimeline({ status }: Props) {
  const steps = [
    { key: "processing", label: "Comandă procesată" },
    { key: "packed", label: "Comandă ambalată" },
    { key: "shipped", label: "Expediată către tine" },
    { key: "delivered", label: "Livrată" },
  ];

  const activeIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="border border-white/10 rounded-xl p-5 bg-[#0f172a]">
      <h3 className="text-xl font-semibold mb-4">Stadiu comandă</h3>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-white/10 rounded-full"></div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isActive = index <= activeIndex;

            return (
              <div key={step.key} className="relative pl-12">
                <div
                  className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    isActive
                      ? "bg-[#00eaff] border-[#00eaff] text-black"
                      : "bg-[#1e293b] border-white/20 text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>

                <p
                  className={`text-lg ${
                    isActive ? "text-white font-semibold" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
