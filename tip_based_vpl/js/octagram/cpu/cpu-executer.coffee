class Executer extends EventTarget
  @latency = 30

  constructor : (@cpu) ->
    @next = null
    @current = null
    @end = false

  getNext : () -> if @next? then @cpu.getTip(@next.x, @next.y) else null

  _execute : (tip) ->
    @current.hideExecutionEffect() if @current?
    @current = tip
    @current.showExecutionEffect()

    if @current.isAsynchronous()
      @current.code.instruction.removeEventListener('completeExecution', @execNext) 
      @current.code.instruction.addEventListener('completeExecution', @execNext) 

    @next = @current.execute()

    if !@next?
      @current.hideExecutionEffect()
      @current = null

    if !tip.isAsynchronous()
      setTimeout(@execNext, Executer.latency)

  execute : () ->
    @end = false
    tip = @cpu.getStartTip()
    @_execute(tip)

  execNext : (e) =>
    if @end
      @current.hideExecutionEffect() if @current
    else
      nextTip = @getNext()

      # asynchronous branch
      if @current? && @current.isAsynchronous() && e && e.params.result? && @current instanceof BranchTransitionCodeTip
        @next = if e.params.result then @current.code.getConseq() else @current.code.getAlter()
        nextTip = @getNext()

      if nextTip?
        if nextTip == @current
          console.log("error : invalid execution timing.")
          @next = @current.code.getNext()
          nextTip = @getNext()

        @_execute(nextTip)

  stop : () -> @end =true
