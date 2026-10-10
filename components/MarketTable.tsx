import type { Market } from "@/lib/api";
import { formatBn, formatBnDecimal } from "@/lib/bn";

export default function MarketTable({ markets }: { markets: Market[] }) {
  if (!markets.length) {
    return (
      <div className="bg-base-200 rounded-xl p-6 text-center text-sm text-base-content/60">
        এই পণ্যের জন্য বাজারের তথ্য নেই
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300">
      <table className="table w-full">
        <thead className="bg-base-200/60">
          <tr>
            <th className="text-left text-xs md:text-sm font-semibold text-base-content/70">
              বাজার
            </th>
            <th className="text-left text-xs md:text-sm font-semibold text-base-content/70">
              বিভাগ
            </th>
            <th className="text-right text-xs md:text-sm font-semibold text-base-content/70">
              সর্বনিম্ন
            </th>
            <th className="text-right text-xs md:text-sm font-semibold text-base-content/70">
              সর্বোচ্চ
            </th>
            <th className="text-right text-xs md:text-sm font-semibold text-base-content/70">
              গড়
            </th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m, i) => {
            const avg = (m.min + m.max) / 2;
            return (
              <tr
                key={i}
                className="border-t border-base-300 hover:bg-base-200/40"
              >
                <td className="text-left font-medium text-sm">{m.market}</td>
                <td className="text-left text-sm text-base-content/70">
                  {m.division}
                </td>
                <td className="text-right tabular-nums text-sm">
                  {formatBn(m.min)} টাকা
                </td>
                <td className="text-right tabular-nums text-sm">
                  {formatBn(m.max)} টাকা
                </td>

                <td className="text-right tabular-nums text-sm text-base-content">
                  {formatBnDecimal(avg)} টাকা
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}