;;;; Stupid and brittle!
(defconst hexstream-sequential-links-regexp
  (let ((prev "a class=\"sequential-link prev\" href=\"\\(.*\\)\">←</a>")
        (current "span>\\([[:digit:]]+\\)/\\([[:digit:]]+\\)</span>")
        (next "a class=\"sequential-link next\" href=\"\\(.*\\)\">→</a>")
        (skip-to-tags "\\(?:[^<]*<\\)+?"))
    (concat "<nav>"
            skip-to-tags "\\(?:" prev "\\)?"
            skip-to-tags current
            skip-to-tags "\\(?:" next "\\)?"
            "\\s-*<?/nav>")))

(make-variable-buffer-local 'hexstream-match-data)

(defun hexstream-save-match-data ()
  (setf hexstream-match-data (match-data)))

(defun hexstream-restore-match-data ()
  (set-match-data hexstream-match-data))

(defun hexstream-sequential-link-prev ()
  (match-string-no-properties 1))

(defun hexstream-sequential-link-numerator ()
  (match-string-no-properties 2))

(defun hexstream-sequential-link-denominator ()
  (match-string-no-properties 3))

(defun hexstream-sequential-link-next ()
  (match-string-no-properties 4))

(defun hexstream-parse-sequential-links ()
  (goto-char (point-min))
  (re-search-forward hexstream-sequential-links-regexp)
  (hexstream-save-match-data))

;; Can't cope with multiple sequential links groups at this time.
(defun hexstream-renumber-sequential-links ()
  (interactive)
  (save-window-excursion
    (hexstream-parse-sequential-links)
    (let ((hexstream-sequential-links-buffers nil))
      (unwind-protect (hexstream-actually-renumber-sequential-links
                       (hexstream-open-sequential-links-buffers
                        (hexstream-sequential-link-prev)
                        (current-buffer)
                        (hexstream-sequential-link-next)))
        ;; Ideally, should kill only if we created the buffer.
        ;; And should throw away partial changes without asking user.
        (dolist (buffer hexstream-sequential-links-buffers)
          (kill-buffer buffer))))))

(defun hexstream-actually-renumber-sequential-links (buffers)
  (let ((denominator (prin1-to-string (length buffers)))
        (i 0))
    (dolist (buffer buffers)
      (incf i)
      (set-buffer buffer)
      (hexstream-restore-match-data)
      (replace-match (prin1-to-string i) nil t nil 2)
      (replace-match denominator nil t nil 3)
      (save-buffer))
    (message "Renumbered %s pages." (length buffers))))

(defun hexstream-open-sequential-links-buffers (prev current next)
  (concatenate 'list
               (nreverse
                (hexstream-chase-sequential-links prev
                                                  (lambda ()
                                                    (hexstream-sequential-link-prev))))
               (list current)
               (hexstream-chase-sequential-links next
                                                 (lambda ()
                                                   (hexstream-sequential-link-next)))))

(defun hexstream-chase-sequential-links (filename selector &optional accumulated)
  (when (string= (file-name-nondirectory filename) "")
    (setf filename (concat filename "index.html")))
  (let ((buffer (find-file filename)))
    (push buffer hexstream-sequential-links-buffers)
    (hexstream-parse-sequential-links)
    (let ((subsequent (funcall selector)))
      (cons buffer
            (if subsequent
                (hexstream-chase-sequential-links subsequent selector accumulated)
              accumulated)))))
