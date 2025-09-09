export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-50 dark:border-gray-700 dark:bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} ClusterCart. All rights reserved.
      </div>
    </footer>
  );
}
