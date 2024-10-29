export default defineContentScript({
    matches: ["*://*/*"],
    main(ctx) {
        const ui = createIntegratedUi(ctx, {
            position: 'inline',
            anchor: 'body',
            onMount: (container) => {
                document.addEventListener('copy', onCopy, true);
            },
        });

        // Call mount to add the UI to the DOM
        ui.mount();
    },
});

function onCopy(e: ClipboardEvent) {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
        // Prevent the default copy behavior
        e.preventDefault();

        // Create the new text with the URL
        const sourceURL = window.location.href;
        const textWithSource = `${selectedText}\n\nSource: ${sourceURL}`;

        // Set the modified text to the clipboard
        e.clipboardData?.setData('text/plain', textWithSource);
    }
}