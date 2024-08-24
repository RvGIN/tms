function showContent(groupName) {
    // 隱藏所有內容
    var contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });

    // 顯示所選群組的內容
    var selectedContent = document.getElementById(groupName);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}
