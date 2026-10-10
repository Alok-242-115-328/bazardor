export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-base-content/70">
        <div>
          <span className="font-bold text-primary">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</div>
      </div>
    </footer>
  );
}