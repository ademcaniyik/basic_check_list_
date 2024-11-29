function loadTasks() {
    $.ajax({
        url: 'tasks.php',
        method: 'GET',
        success: function(response) {
            let pendingTasks = '';
            let doneTasks = '';

            response.tasks.forEach(task => {
                if (task.status === 'pending') {
                    pendingTasks += `<li data-id="${task.id}">
                        <input type="checkbox" class="mark-done"> <span class="task-text">${task.description}</span>
                        <input type="text" class="edit-task-input" data-id="${task.id}" style="display: none;">
                        <button class="edit-task-btn" data-id="${task.id}">Düzenle</button>
                    </li>`;
                } else {
                    doneTasks += `<li class="done" data-id="${task.id}">
                        <input type="checkbox" class="mark-undone" checked> <span class="task-text">${task.description}</span>
                        <input type="text" class="edit-task-input" data-id="${task.id}" style="display: none;">
                        <button class="edit-task-btn" data-id="${task.id}" style="display: none;">Kaydet</button>
                    </li>`;
                }
            });

            $('#pending-tasks-list').html(pendingTasks);
            $('#done-tasks-list').html(doneTasks);

            // Yapılacaklar listesini sıralanabilir hale getirme
            $('#pending-tasks-list').sortable({
                update: function(event, ui) {
                    let order = $(this).sortable('toArray', { attribute: 'data-id' });
                    updateTaskOrder(order);
                }
            });
        }
    });
}

function updateTaskOrder(order) {
    $.ajax({
        url: 'update_task_order.php',
        method: 'POST',
        data: { order: order },
        success: function(response) {
            console.log('Task order updated: ', response); // Debugging için
        },
        error: function(xhr, status, error) {
            console.error('Error updating task order: ', error); // Hata kontrolü için
        }
    });
}

$(document).ready(function() {
    loadTasks();

    $('#add-task-btn').on('click', function() {
        const description = $('#new-task').val();

        if (description) {
            $.ajax({
                url: 'add_task.php',
                method: 'POST',
                data: { description },
                success: function() {
                    $('#new-task').val('');
                    loadTasks();
                }
            });
        }
    });

    // Enter tuşuna basıldığında ekle butonunun çalışmasını sağlamak
    $('#new-task').on('keypress', function(e) {
        if (e.which == 13) { // Enter tuşunun kodu 13'tür
            $('#add-task-btn').click();
        }
    });

    // Görevi tamamlanmış olarak işaretleme veya geri alma
    $(document).on('click', '.mark-done, .mark-undone', function() {
        const taskId = $(this).closest('li').data('id');
        const isDone = $(this).hasClass('mark-undone');
        const newStatus = isDone ? 'pending' : 'done';

        $.ajax({
            url: 'update_task_status.php',
            method: 'POST',
            data: { id: taskId, status: newStatus },
            success: function(response) {
                loadTasks();
            },
            error: function(xhr, status, error) {
                console.error('Error updating task status: ', error);
            }
        });
    });

    // Görev düzenleme işlevi
    $(document).on('click', '.edit-task-btn', function() {
        const taskId = $(this).data('id');
        const $li = $(this).closest('li');
        const $taskText = $li.find('.task-text');
        const $editInput = $li.find('.edit-task-input');
        const $editButton = $li.find('.edit-task-btn');

        if ($editInput.is(':visible')) {
            const newDescription = $editInput.val();
            $.ajax({
                url: 'update_task_description.php',
                method: 'POST',
                data: { id: taskId, description: newDescription },
                success: function() {
                    $taskText.text(newDescription);
                    $editInput.hide();
                    $editButton.text('Düzenle').show();
                },
                error: function(xhr, status, error) {
                    console.error('Error updating task description: ', error);
                }
            });
        } else {
            $editInput.val($taskText.text()).show();
            $editButton.text('Kaydet').show();
        }
    });

    // Görev üzerine tıklanarak düzenleme işlevi
    $(document).on('click', '.task-text', function() {
        const $taskText = $(this);
        const $li = $taskText.closest('li');
        const $editInput = $li.find('.edit-task-input');
        const $editButton = $li.find('.edit-task-btn');

        $editInput.val($taskText.text()).show();
        $editButton.text('Kaydet').show();
    });
});
